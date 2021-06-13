const cors = require("cors");
const uuid = require('uuid');
const { app, ipcMain } = require("electron");
const express = require("express");
const getPort = require("get-port");
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');

const apiDetails = {
    port:0,
    signingKey:"",
};

const exampleNote = {
    "type": "doc",
    "content": [
        {
        "type": "paragraph",
        "content": [
            {
            "type": "text",
            "text": "It’s 19871. You can’t turn on a radio, or go to a mall without hearing Olivia Newton-John’s hit song, Physical."
            }
        ]
        }
    ]
}


const typeDefs = `
  scalar JSON
  scalar JSONObject

  type Note {
      type: String
      content: JSON
  }

  type Query {
    notes: [Note],
    note: Note
  }
`

// Resolver map
const resolvers = {
  Query: {
    notes: (args) => {
        return [exampleNote, exampleNote, exampleNote]
    },
    note: (parent, args) => {
        return exampleNote;
    },
  },
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const server = express();

server.use(cors())

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const isProd = app.isPackaged

const initializeApi = async () => {
    const availablePort = await getPort();
    const key = !isProd ? "devkey" : uuid.v4();

    apiDetails.port = !isProd ? 5000 : availablePort;
    apiDetails.signingKey = key;
    
    server.listen(apiDetails.port);
    console.log(`👋 Running a GraphQL API server at http://localhost:${apiDetails.port}/graphql`);
};

ipcMain.handle("getApiDetails", async () => {
    if (apiDetails.signingKey !== "") {
        return JSON.stringify(apiDetails);
    } else {
        try {
            await initializeApi()
            return JSON.stringify(apiDetails);
        } catch (e) {
            return e
        }
    }
});

initializeApi();
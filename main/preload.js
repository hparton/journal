const { getPath, contextBridge } = require("electron");
const path = require("path");
const { Model } = require("objection");
const Knex = require("knex");

// Initialize knex.
const knex = Knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.join(__dirname, "./example.sqlite"),
  },
});

// Give the knex instance to objection.
Model.knex(knex);

// Person model.
class Person extends Model {
  static get tableName() {
    return "persons";
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Person,
        join: {
          from: "persons.id",
          to: "persons.parentId",
        },
      },
    };
  }
}

// Person model.
class Note extends Model {
  static get tableName() {
    return "notes";
  }

  static get virtualAttributes() {
    return ["tasks"];
  }

  get tasks() {
    try {
      const body = JSON.parse(this.contents);
      let total = 0
      let completed = 0

      const computeSomething = (node) => {
        if (node.type === 'taskItem') {
            // bang
            console.log('found me a taskItem that is: ', node.attrs.checked)
            total = total + 1
            if (node.attrs.checked) {
                completed = completed + 1
            }
            return
        }

        if (node.content && Array.isArray(node.content)) {
            node.content.map(node => computeSomething(node))
        }
      }

      computeSomething(body)

      if (!total) {
        return false
      }

      return {
        total,
        completed,
        allCompleted: total === completed,
      };
    } catch (e) {
      return false;
    }
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

async function createSchema() {
  if (await knex.schema.hasTable("notes")) {
    return;
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await knex.schema.createTable("notes", (table) => {
    table.increments("id").primary();
    table.string("title").defaultTo("New note");
    table.json("contents");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

createSchema();

contextBridge.exposeInMainWorld("Notes", {
  create: async (contents) => {
    // Create some people.
    const newNote = await Note.query().insertGraph({
      contents: JSON.stringify(contents),
      created_at: new Date().toISOString(),
    });

    return newNote;
  },
  all: async (page = 1) => {
    const notes = await Note.query()
      .orderBy("updated_at", "DESC")
      .orderBy("id", "DESC");

    console.log(notes);
    return notes.map((note) => note.toJSON());
  },
  count: async () => {
    const count = await Note.query().count();
    return count;
  },
  get: async (id) => {
    const note = await Note.query().findById(id);
    return note.toJSON();
  },
  search: async (input) => {
    const notes = await Note.query()
      .where("title", "like", `%${input}%`)
      .orWhere("contents", "like", `%${input}%`)
      .orderBy("updated_at", "DESC")
      .orderBy("id", "DESC");
    return notes.map((note) => note.toJSON());
  },
  update: async (id, content) => {
    const note = await Note.query()
      .findById(id)
      .patch({ ...content });
    return note.toJSON();
  },
  delete: async (ids) => {
    const toDelete = !Array.isArray(ids) ? [ids] : ids;
    const deleted = await Note.query().delete().whereIn("id", toDelete);
    return deleted;
  },
});

import React, { useEffect, useMemo, useState } from "react";
import { MemoryRouter, Switch, Route, HashRouter } from "react-router-dom";

import Layout from "./components/ui/Layout";
import DragArea from "./components/ui/DragArea";

import Editor from "./components/Editor";
import NoteList from './components/NoteList'
import SearchNotes from "./components/SearchNotes";

function App() {
  return (
    <MemoryRouter>
      <DragArea />
      <Layout>
        <div className="w-full h-full items-center justify-center flex">
          <Switch>
            <Route path="/notes/:id" exact>
              <Editor />
            </Route>
            <Route path="/" exact>
              <NoteList />
            </Route>
            <Route path="/search">
              <SearchNotes />
            </Route>
            <Route>
              <p>How did you get here?</p>
            </Route>
          </Switch>
        </div>
      </Layout>
    </MemoryRouter>
  );
}

export default App;

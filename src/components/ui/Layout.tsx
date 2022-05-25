import React, { FunctionComponent, useEffect } from "react";
import Navigation from "../sidebar/Navigation";
import Sidebar from "../sidebar/Sidebar";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as NoteIcon } from "../../assets/icons/document.svg";
import { ReactComponent as NotesIcon } from "../../assets/icons/document-duplicate.svg";
import { ReactComponent as HelpIcon } from "../../assets/icons/question-mark-circle.svg";
import { ReactComponent as TemplatesIcon } from "../../assets/icons/view-boards.svg";
import { ReactComponent as CommandsIcon } from "../../assets/icons/view-grid-add.svg";
import { useHistory } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

interface Props {}

const Layout: FunctionComponent<Props> = ({ children }) => {
  const history = useHistory()

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-white">
      <Sidebar>
        <Sidebar.Create
          label="New note"
          onClick={async () => {
            const note = await window.Notes.create({type: 'doc', content: ''})
            history.push(`/notes/${note.id}`)
          }}
        />

        <Navigation>
          <Navigation.Link Icon={SearchIcon} to="/search" label="Search" disabled />
          <Navigation.Link Icon={NoteIcon} to="/" label="Last note" disabled />
          <Navigation.Link Icon={NotesIcon} to="/" label="Notes" />
          <Navigation.Link
            Icon={TemplatesIcon}
            to="/"
            label="Templates"
            disabled
          />
          <Navigation.Link
            Icon={CommandsIcon}
            to="/"
            label="Commands"
            disabled
          />
        </Navigation>

        <div className="mt-auto">
          <Navigation>
            <Navigation.Link Icon={HelpIcon} to="/help" disabled label="Help" />
          </Navigation>
        </div>
      </Sidebar>
      <div className="flex-grow w-full h-full">{children}</div>
    </div>
  );
};

export default Layout;

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DateFormat from "./ui/DateFormat";
import TitleBar from "./ui/TitleBar";
import { ReactComponent as DeleteIcon } from "../assets/icons/trash.svg";

const NoteList = ({}) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const asyncThing = async () => {
      const res = await window.Notes.all();
      console.log(res);
      setNotes(res);
    };

    asyncThing();
  }, []);

  const [selectedNotes, setSelectedNotes] = useState([]);

  return (
    <div className="flex flex-col w-full h-full">
      <TitleBar>
        <div className="flex w-full h-full items-center justify-between px-11">
          <p className="text-sm">
            <span className="opacity-50">{notes.length}</span> Notes
          </p>
          {selectedNotes.length ? (
              <div className="flex items-center space-x-2">
            <button
              onClick={async () => {
                await window.Notes.delete(selectedNotes);
                setNotes((notes) =>
                  notes.filter(({ id }) => !selectedNotes.includes(id))
                );
                setSelectedNotes([]);
              }}
              className="font-medium leading-none inline-flex items-center p-2 py-2 rounded bg-accent text-textOnAccent"
              style={{
                fontSize: 13,
              }}
            >
              <DeleteIcon className="mr-2" /> Delete notes
            </button>
            <button
              onClick={() => {
                setSelectedNotes([]);
              }}
              className="font-medium leading-none inline-flex items-center p-2 py-2 rounded border border-border"
              style={{
                fontSize: 13,
              }}
            >
              Clear
            </button>
            </div>
          ) : null}
        </div>
      </TitleBar>
      <div className="w-full h-full flex flex-col overflow-auto text-textOnAccent">
        {notes.map(({ id, title, contents, updated_at, created_at, tasks }) => (
          <Link
            key={id}
            to={`notes/${id}`}
            className=" text-sm border-b border-border  justify-between relative flex items-center group py-3  px-11   "
          >
            <div
              className={`opacity-0 absolute top-0 bottom-0 flex items-center left-4  group-hover:opacity-100 ${
                selectedNotes.includes(id) ? "opacity-100" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <label className="customCheckbox">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    setSelectedNotes((curr) =>
                      e.target.checked
                        ? [...curr, id]
                        : curr.filter((v) => v !== id)
                    );
                  }}
                  checked={selectedNotes.includes(id)}
                />
                <span />
              </label>
            </div>
            <div className="flex items-center space-x-2 group relative">
              <p className="capitalize">{title}</p>
              {tasks ? (
                <div className="flex items-center justify-center py-1 px-2 rounded-full border border-border">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      tasks.allCompleted
                        ? "bg-accent"
                        : " border-2 border-border"
                    }`}
                  />
                  <span className="text-xs text-sidebarText ml-1 opacity-50 tabular-nums tracking-wider">
                    {tasks.completed}/{tasks.total}
                  </span>
                </div>
              ) : null}
            </div>
            <p className="opacity-75 text-xs flex-shrink-0">
              <DateFormat
                value={updated_at ?? created_at}
                dateFormat="do LLL yyyy - h:mmaaa"
              />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NoteList;

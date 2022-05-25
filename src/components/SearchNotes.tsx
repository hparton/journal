import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DateFormat from "./ui/DateFormat";
import TitleBar from "./ui/TitleBar";

const SearchNotes = ({}) => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const asyncThing = async () => {
      const res = await window.Notes.all();
      console.log(res);
      setNotes(res);
    };

    asyncThing();
  }, []);

  useEffect(() => {
    const asyncThing = async () => {
      const res = await window.Notes.search(searchTerm);
      console.log(res);
      setNotes(res);
    };

    asyncThing();
  }, [searchTerm]);


  return (
    <div className="flex flex-col w-full h-full">
      <TitleBar>
        <div className="flex w-full h-full items-center justify-between px-11">
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full appearance-none bg-background" type="text" />          
        </div>
      </TitleBar>
      <div className="w-full h-full flex flex-col overflow-auto text-textOnAccent">
        {notes.map(({ id, title, contents, updated_at, created_at }) => (
          <Link
            key={id}
            to={`notes/${id}`}
            className=" text-sm border-b border-border py-3  px-11 flex items-center justify-between "
          >
            <div className="flex items-center space-x-2">
              <p className="capitalize">{title}</p>
            </div>
            <p className="opacity-75 text-xs">
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

export default SearchNotes;

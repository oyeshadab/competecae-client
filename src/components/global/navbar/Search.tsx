import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();

  const search = (e) => {
    console.log("search", e);
    e.preventDefault();
    navigate("/search/" + e.target.search.value);
    e.target.search.value = "";
  };

  return (
    <div className="flex flex-grow items-center gap-4 bg-yellow-100 rounded-full py-4 px-5">
      <button type="button">
        <img className="h-4" src="/images/Group 6.svg" alt="" />
      </button>
      <form onSubmit={search}>
        <input
          type="text"
          className="placeholder:text-gray-400 text-gray-200 bg-transparent flex-grow w-full text-21xl"
          placeholder="Search..."
        />
      </form>
    </div>
  );
}

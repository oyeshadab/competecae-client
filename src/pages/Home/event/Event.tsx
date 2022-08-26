import React from "react";
// @ts-ignore
import Item from "./Item.tsx";

export default function Event() {
  const userData = JSON.parse(localStorage.getItem("_auth_state") || "{}");
  return (
    <div>
      <div className="flex justify-center items-center">
        <h4 className="font-poppins text-medium text-28xl mb-4 mx-5">
          Live&nbsp;Events
        </h4>
        <a
          href={`${process.env.REACT_APP_API_URL}/users/getWithingsCode?userId=${userData.user_id}`}
          about="_blank"
          className="flex items-center justify-center font-poppins  bg-primary-700 text-yellow-50 text-7xl font-semibold rounded-full py-3 px-5 sm:px-14 hover:no-underline shadow-7xl"
        >
          Whitings&nbsp;Connect
        </a>
      </div>
      <ul className="list-none grid grid-cols-2 gap-2 mb-4">
        {[...Array(4)].map((_, i) => (
          <Item key={i} />
        ))}
      </ul>
      <a href="#" className="font-medium text-16xl mx-0.5">
        See more
      </a>
    </div>
  );
}

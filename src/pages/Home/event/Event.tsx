import React from "react";
// @ts-ignore
import Item from "./Item.tsx";

export default function Event() {
  return (
    <div>
      <h4 className="font-poppins text-medium text-28xl mb-4 mx-5">
        Live Events
      </h4>
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

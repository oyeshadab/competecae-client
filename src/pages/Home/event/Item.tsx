import React from "react";
// @ts-ignore

import Watching from "./Watching.tsx";

export default function Item() {
  return (
    <li className="border rounded-lg overflow-hidden border-gray-50">
      <div
        className="relative py-6 px-4 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: 'url("/images/Rectangle 34 (1).jpg")' }}
      >
        <h5 className="gap-1 flex items-center mb-1.5">
          <div className="w-4 h-4 ">
            <div className="w-4 h-4 ">
              <img
                className="w-4 h-4  drop-shadow-2xl"
                src="/images/Frame (2).svg"
                alt=""
              />
            </div>
          </div>
          <span className="text-shadow-1xl text-white font-medium text-22xl leading-[30px]">
            Game 1
          </span>
        </h5>
        <p className="text-shadow-1xl text-white text-13xl mb-3">
          Start watching with friends &amp; family.
        </p>
        <button
          type="button"
          className="font-medium font-montserrat text-4xl text-primary-800 bg-white rounded-md p-2 opacity-90 shadow-4xl"
        >
          Watch Now
        </button>
      </div>
      <Watching />
    </li>
  );
}

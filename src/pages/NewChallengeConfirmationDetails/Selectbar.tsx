import React from 'react';

export default function Selectbar() {
  return (
    <div className="flex-grow w-full lg:w-auto">
      <div className="bg-yellow-100 rounded-full h-6 w-full flex justify-end items-center ">
        <span className="text-black font-medium text-6xl w-1/2 bg-yellow-700 h-full flex items-center justify-center text-center px-5 rounded-full">
          Select Types
        </span>
      </div>
    </div>
  );
}

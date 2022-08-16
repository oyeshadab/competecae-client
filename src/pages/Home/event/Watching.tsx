import React from 'react';

export default function Watching() {
  return (
    <div className="bg-yellow-700 py-2.5 px-3.5 grid grid-cols-2">
      <div className="flex">
        {[...Array(3)].map((_, i) => (
          <img
            className="w-5 h-5 rounded-full border border-white first:ml-0 -ml-2 relative"
            src="/images/Ellipse 28.jpg"
            alt=""
            style={{ zIndex: 3 - i }}
            key={i}
          />
        ))}
      </div>
      <span className="text-2xl text-gray-500">35 friends watching now</span>
    </div>
  );
}

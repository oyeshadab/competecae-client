import React from 'react';

export default function CardOptions() {
  return (
    <div className="bg-white shadow-3xl p-4 sm:p-8 rounded-md mb-9">
      <div className="flex gap-8 justify-between">
        {[
          'Payment Methods.svg',
          'Payment Methods (1).svg',
          'Payment Methods (2).svg',
          'Payment Methods (3).svg',
        ].map((_, i) => (
          <img
            src={`/images/${_}`}
            className="h-[30px] sm:h-[45px] cursor-pointer"
            key={i}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}

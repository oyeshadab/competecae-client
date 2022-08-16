import React from 'react';

export default function Messenger() {
  return (
    <div className="bg-yellow-700 bg-opacity-50 py-3 px-5 rounded-lg shadow-5xl">
      <div className="flex flex-col mb-2">
        {[['Hi', 'How are you?'], ['Hello']].map((_, i) => (
          <div className="" key={i}>
            {_.map((text, index) => (
              <div key={index} className={`flex mb-0.5 ${i % 2 !== 0 ? 'justify-end' : ''}`}>
                <div key={index} className={`w-1/2 flex ${i % 2 !== 0 ? 'justify-end' : ''}`}>
                  <span className="bg-yellow-700 bg-opacity-25 py-3 px-6 rounded-full inline-block">
                    {text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bg-yellow-700 bg-opacity-25 rounded-full py-2 px-3 flex items-center">
        <input
          type="text"
          className="text-medium text-16xl text-gray-600 flex-grow bg-transparent p-1"
          placeholder="Type"
        />
        <button type="button">
          <img src="/images/icons8-send-60 11.png" className="w-[18px] h-[18px]" alt="" />
        </button>
      </div>
    </div>
  );
}

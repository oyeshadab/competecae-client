import React from 'react';

export default function SearchPeople() {
  return (
    <div className="bg-yellow-700 bg-opacity-25 rounded-full px-4 pt-3 pb-4 flex gap-3 item mb-5">
      <img className="h-4" src="/images/Group 6 (1).svg" alt="" />
      <input
        type="text"
        placeholder="Search by name"
        className="font-medium text-16xl placeholder:text-gray-600 flex-grow bg-transparent"
      />
    </div>
  );
}

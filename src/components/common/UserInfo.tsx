import React from 'react';

interface UserInfoProps {
  image: string;
  name: string;
  active: string;
}

export default function UserInfo({ image, name, active }: UserInfoProps) {
  return (
    <div className="flex gap-4">
      <img className="w-12 h-12" src={image} alt={name} />
      <div className="flex flex-col flex-grow">
        <strong className="font-medium text-23xl">{name}</strong>
        <span className="text-gray-70 text-18xl">{active}</span>
      </div>
    </div>
  );
}

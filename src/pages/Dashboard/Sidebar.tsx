import React from 'react';
import useNavbarEffect from './../../hooks/useNavbarEffect.ts';

const footerLinks = [
  {
    id: 3545,
    name: 'Setting',
    icon: '/images/icon.svg',
  },
  {
    id: 324,
    name: 'Log out',
    icon: '/images/Group 74.svg',
  },
];

export default function Sidebar() {
  const sidebar = useNavbarEffect('h-[calc(100vh_-_120px)]', 'h-[calc(100vh_-_85px)]', 70);

  return (
    <div
      className={`bg-white duration-200 rounded-xl flex-col justify-between sticky top-[85px] w-[221px] hidden lg:flex ${sidebar}`}
    >
      <div>
        <div className="py-10 mb-3">
          <h4 className="font-raleway text-center font-bold text-28xl text-[#323232]">
            Competition
          </h4>
        </div>
        <div>
          <div className="flex gap-3 items-center bg-[#F9EEDE] px-10 py-4 cursor-pointer mb-3">
            <img src="/images/cae 2 .svg" className="w-7" alt="" />
            <span className="text-[#4F46BA] font-medium text-22xl">Lorem</span>
          </div>
          <ul className="list-none flex flex-col">
            {[...Array(5)].map((_, i) => (
              <li
                key={i}
                className="font-medium cursor-pointer px-10 py-4 text-21xl text-[#BBBBBB]"
              >
                Competition {i + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <ul className="flex flex-col px-8">
          {footerLinks.map(({ id, name, icon }) => (
            <li key={id} className="flex py-4 gap-5 cursor-pointer">
              <img src={icon} alt="" />
              <span className="text-[#BBBBBB] text-20xl font-medium"> {name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

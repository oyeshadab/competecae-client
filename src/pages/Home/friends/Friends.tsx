import React from "react";
// @ts-ignore
import UserInfo from "../../../components/common/UserInfo.tsx";
// @ts-ignore
import Messenger from "./Messenger.tsx";
// @ts-ignore
import SearchPeople from "./SearchPeople.tsx";

export default function Friends() {
  return (
    <div className="mb-10">
      <div className="bg-yellow-700 bg-opacity-50 pt-3 pb-4 px-5 rounded-lg mb-4">
        <h4 className="text-28xl font-medium mb-4">Friends</h4>
        <SearchPeople />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <UserInfo
              image="/images/img (1).png"
              name="Alex De Silva"
              active="Online 2 min"
            />
            <button type="button">
              <img
                className="w-[18px] h-[18px]"
                src="/images/icons8-send-60 3.png"
                alt=""
              />
            </button>
          </div>
          {[...Array(6)].map((_, i) => (
            <div className="flex justify-between" key={i}>
              <UserInfo
                image="/images/img (1).png"
                name="Alex De Silva"
                active="Online 2 min"
              />
              <button type="button">
                <img
                  className="w-[18px] h-[18px]"
                  src="/images/icons8-send-60 3.png"
                  alt=""
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Messenger />
    </div>
  );
}

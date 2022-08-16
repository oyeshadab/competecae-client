import React from "react";
import { useAuthUser } from "react-auth-kit";

export default function Username() {
  const authUser = useAuthUser();

  return (
    <div>
      <button type="button" className="flex items-center gap-2">
        <img className="w-10 h-10 rounded-full" src="/images/img.png" alt="" />
        <strong className="font-semibold text-19xl">
          {authUser()?.username}
        </strong>
        <img src="/images/Vector 20.svg" alt="" />
      </button>
    </div>
  );
}

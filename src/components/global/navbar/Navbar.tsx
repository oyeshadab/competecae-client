import React, { useState } from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import useNavbarEffect from "../../../hooks/useNavbarEffect.ts";
// @ts-ignore
import Logo from "./Logo.tsx";
// @ts-ignore
import Pages from "./pages/Pages.tsx";
// @ts-ignore
import Search from "./Search.tsx";
// @ts-ignore
import Status from "./Status.tsx";
// @ts-ignore
// import Username from "./username/Username.jsx";
import UsernameBar from "./username/Username";
// @ts-ignore
import Mobile from "./Mobile.tsx";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => setDrawer((v) => !v);
  const navbar = useNavbarEffect("py-8 md:py-11", "py-4 shadow-6xl", 70);
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false)

  const search = (e) => {
    console.log("search", e);
    e.preventDefault();
    navigate("/search/" + message);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);

    console.log("value is:", event.target.value);
  };

  return (
    <nav className={`bg-white z-[1020] sticky top-0 duration-200 ${navbar}`}>
      <div className="hidden lg:flex gap-10 justify-between container items-center">
        <Logo />
        <div className="flex gap-8 items-center flex-grow">
          <div className="flex flex-grow items-center gap-4 bg-yellow-100 rounded-full py-4 px-5">
            <button type="button">
              <img className="h-4" src="/images/Group 6.svg" alt="" />
            </button>
            <form onSubmit={search}>
              <input
                type="text"
                onChange={handleChange}
                value={message}
                className="placeholder:text-gray-400 text-gray-200 bg-transparent flex-grow w-full text-21xl"
                placeholder="Search..."
              />
            </form>
          </div>
          <Pages />
        </div>
        <div className="flex gap-8 items-center">
          <Status />
          <div className="hidden xl:block">
            <div
              style={{
                display: authUser() == null ? "None" : "block",
              }}
            >
              <UsernameBar/>
            </div>
          </div>
        </div>
      </div>
      <Mobile toggleDrawer={toggleDrawer} drawer={drawer} />
      <div className="fixed bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-5 md:right-5 lg:bottom-8 lg:right-8 xl:hidden">
        <button type="button">
          <img className="w-14 h-14" src="/images/Group 157.svg" alt="" />
        </button>
      </div>
    </nav>
  );
}

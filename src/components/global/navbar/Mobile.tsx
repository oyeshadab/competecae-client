import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import "./mobile.scss";

// @ts-ignore
import Logo from "./Logo.tsx";
// @ts-ignore
import Pages from "./pages/Pages.tsx";
// @ts-ignore
import Search from "./Search.tsx";
// @ts-ignore
import Status from "./Status.tsx";

import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";

import { useIsAuthenticated, useSignOut } from "react-auth-kit";

interface MobileProps {
  toggleDrawer: () => void;
  drawer: boolean;
}

export default function Mobile({ toggleDrawer, drawer }: MobileProps) {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const signUserOut = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/logout`, {
        data: {
          token: authUser().refreshToken,
        },
      })
      .then((res) => {
        signOut();
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    <div className="flex lg:hidden gap-8 justify-between container items-center" onBlur={()=> setDropdownVisible(false)}>
      <div className="d-flex flex-row">
        <button
          style={{ marginRight: "10px" }}
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <img src="/images/Vector 20.svg" alt="" />
        </button>
        <div
          className="flex-column user-dropdown12"
          style={{
            display: dropdownVisible ? "flex" : "none",
            position: "absolute",
          }}
        >
          <Link
            className="d-flex justify-content-center user-dropdown__item"
            to="/profile"
          >
            Profile
          </Link>
          <Link
            className="d-flex justify-content-center user-dropdown__item"
            to="/settings"
          >
            Settings
          </Link>
          <p
            className="d-flex justify-content-center user-dropdown__item"
            onClick={() => signUserOut()}
          >
            Log Out
          </p>
        </div>
        <Link to="/">
          <img src="/images/img (2).png" className="w-9 h-9" alt="" />
        </Link>
      </div>
      <div className="sm:hidden">
        <Logo />
      </div>
      <div className="flex-grow hidden sm:block">
        <div className="max-w-[300px]">
          <Search />
        </div>
      </div>
      <div className="hidden sm:block">
        <Status />
      </div>
      <button type="button" onClick={toggleDrawer}>
        <img src="/images/Group 158.svg" alt="" />
      </button>

      <div className="absolute">
        <Drawer
          style={{ width: 275 }}
          open={drawer}
          onClose={toggleDrawer}
          direction="left"
        >
          <div className="h-full px-4 py-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between gap-4 pt-2">
                <div onClick={toggleDrawer}>
                  <Logo />
                </div>
                <button type="button" onClick={toggleDrawer}>
                  <img src="/images/Group 158 (1).svg" alt="" />
                </button>
              </div>
              <hr className="my-8 border-gray-50" />
              <div className="px-2 mb-8">
                <Pages toggleDrawer={toggleDrawer} mobile />
              </div>
            </div>
            <footer className="flex flex-col gap-8 pb-4"></footer>
          </div>
        </Drawer>
      </div>
    </div>
  );
}

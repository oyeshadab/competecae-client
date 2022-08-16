import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import "./username.scss";

export default function UsernameBar() {
  const authUser = useAuthUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const userData = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

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

  return (
    <div onBlur={() => setDropdownVisible(false)}>
      <div>
        <button
          onClick={() => setDropdownVisible(!dropdownVisible)}
          type="button"
          className="flex items-center gap-2"
        >
          <img
            className="w-10 h-10 rounded-full"
            src="/images/img.png"
            alt=""
          />
          <strong className="font-semibold text-19xl">
            {authUser()?.username}
          </strong>
          <img src="/images/Vector 20.svg" alt="" />
        </button>
        <div
          className="flex-column user-dropdown123"
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
      </div>
    </div>
  );
}

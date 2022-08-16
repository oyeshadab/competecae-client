import React from "react";
import { Link } from "react-router-dom";
import pages from "./pages.json";
import { useAuthUser } from "react-auth-kit";

interface PagesProps {
  mobile?: boolean;
  toggleDrawer?: () => void;
}

export default function Pages({ toggleDrawer, mobile }: PagesProps) {
  const authUser = useAuthUser();

  return (
    <div className="">
      <ul
        className={`list-none flex ${
          mobile ? "flex-col gap-3" : "flex-row gap-8"
        }`}
      >
        {pages.map(({ id, name, url }) => (
          <li key={id} onClick={toggleDrawer}>
            <Link
              className="text-27xl text-primary-700"
              to={
                (authUser() != null && name != "Register") ||
                (authUser() == null && name == "Register")
                  ? url
                  : "/"
              }
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

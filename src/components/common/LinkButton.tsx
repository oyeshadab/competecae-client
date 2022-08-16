import React from "react";
import { Link, To } from "react-router-dom";

interface LinkButtonProps {
  url: To;
  endIcon?: string;
  startIcon?: string;
  text: string;
  state?: any;
}

export default function LinkButton({
  url,
  state,
  startIcon,
  endIcon,
  text,
}: LinkButtonProps) {
  return (
    <Link
      to={url}
      state={state}
      className="flex items-center justify-center gap-1 text-black bg-yellow-700 text-24xl rounded-full py-3.5 px-14 hover:no-underline"
    >
      {startIcon && <img src={startIcon} alt="" />}
      <span>{text}</span>
      {endIcon && <img src={endIcon} alt="" />}
    </Link>
  );
}

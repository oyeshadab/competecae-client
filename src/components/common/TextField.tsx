import React from "react";

export interface TextFieldProps {
  type?: string;
  label?: string;
  sign?: string;
  icon?: string;
  placeholder?: string;
  min?: string;
  value?: any;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

export default function TextField({
  type,
  sign,
  icon,
  label,
  placeholder,
  min,
  value,
  inputProps,
}: TextFieldProps) {
  const id = Math.random();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={`id${id}`} className="text-17xl font-medium">
          {label}
        </label>
      )}
      <div className="relative flex-grow">
        <input
          id={`id${id}`}
          value={value}
          type={type}
          min={min}
          className="bg-yellow-100 border-primary-700 border border-opacity-25 text-primary-700 placeholder:text-primary-700 placeholder:text-opacity-40 rounded-full py-2 px-5 font-semibold text-5xl w-full"
          placeholder={placeholder}
          {...inputProps}
        />
        {sign && (
          <span className="absolute right-0 bg-yellow-700 font-medium text-17xl px-5 py-1 h-full rounded-full flex top-0 items-center justify-center ">
            {sign}
          </span>
        )}
        {icon && (
          <span className="absolute right-0 font-medium text-17xl px-4 py-1 h-full rounded-full flex top-0 items-center justify-center ">
            <img src={icon} alt="" />
          </span>
        )}
      </div>
    </div>
  );
}

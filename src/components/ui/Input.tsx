"use client";

import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export type inputType = {
  type: string;
  placeHolder?: string;
  label: string;
  required?: boolean;
  value?: string | number;
  register?: any;
  readOnly?: boolean;
  className?: string;
  labelStyle?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = React.forwardRef<HTMLInputElement, inputType>(
  (
    {
      label,
      type,
      value,
      placeHolder,
      required = false,
      readOnly = false,
      className = "",
      labelStyle = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="flex flex-col gap-1 w-full relative">
        <label className={`text-sm font-medium text-gray-700  dark:text-secondary-dark ${labelStyle}`}>
          {label}
        </label>
        <div className="relative">
          <input
            className={`w-full px-4 py-2 placeholder:text-sm  rounded-lg border dark:border-primary-dark place bg-white dark:bg-white placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition ${isPassword ? 'pr-10' : ''}
              ${
              readOnly
                ? "border-primary dark:border-white font-medium bg-gray-50 dark:bg-primary-dark"
                : ""
            } ${className}`}
            readOnly={readOnly}
            type={isPassword ? (!showPassword ? "password" : "text") : type }
            placeholder={placeHolder}
            required={required}
            value={value}
            ref={ref}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              tabIndex={-1}
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
"use client";

import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import AnimateScale from "@/lib/Animation/AnimateScale";

export type inputType = {
  type: string;
  placeHolder?: string;
  label: string;
  error?: string;
  className?: string;
  labelStyle?: string;
};

export const FormInput = React.forwardRef<HTMLInputElement, inputType>(
  (
    {
      label,
      type,
      placeHolder,
      className = "",
      labelStyle = "",
      error = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full">
        <div className="flex flex-col gap-1 w-full relative">
          <label
            className={`text-sm font-medium text-gray-700  dark:text-secondary-dark ${labelStyle}`}
          >
            {label}
          </label>
          <div className="relative">
            <input
              className={`w-full px-4 py-2 placeholder:text-sm  rounded-lg border dark:border-primary-dark place bg-white dark:bg-white placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-primary-dark focus:outline-hidden focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition ${
                isPassword ? "pr-10" : ""
              }${className}`}
              type={isPassword ? (!showPassword ? "password" : "text") : type}
              placeholder={placeHolder}
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
        {error && (
          <AnimateScale>
            <p className="text-[13px] mx-1 text-red-500 mt-1 font-medium">{error}</p>
          </AnimateScale>
        )}
      </div>
    );
  }
);

FormInput.displayName = "Input";

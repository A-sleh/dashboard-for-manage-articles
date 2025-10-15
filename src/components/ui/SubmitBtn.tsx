import React from "react";

export default function SubmitBtn({
  lable,
  isLoading,
}: {
  lable: string;
  isLoading: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`bg-primary  dark:bg-secondary-dark rounded-md my-2 text-white px-2 py-1 cursor-pointer w-full transition-all hover:text-black hover:bg-white hover:outline-primary hover:outline-1 ${
        isLoading ? "opacity-55" : "opacity-100"
      }`}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 my-1 mx-auto"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : (
        lable
      )}
    </button>
  );
}

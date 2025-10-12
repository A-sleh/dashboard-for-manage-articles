import React, { useState, useRef, useEffect } from "react";
import { MdClose, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

type CustomMultiSelectProps = {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (selected: (string)[]) => void;
  placeholder?: string;
};

export default function MultiSelectInput({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
}: CustomMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle select/deselect option
  const toggleOption = (value: string ) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  // Remove tag button handler
  const removeSelected = (value: string | number) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  return (
    <div className="w-full flex-1 relative" ref={containerRef}>
      <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
        {label}
      </label>

      {/* Input box */}
      <div
        className="relative flex flex-wrap items-center gap-1 min-h-[40px] px-3 py-2 border border-gray-300 rounded-md cursor-pointer
                   dark:bg-transparent dark:border-white dark:text-gray-100"
        onClick={() => setIsOpen((open) => !open)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter") {
            e.preventDefault();
            setIsOpen(true);
          }
          if (e.key === "Escape") {
            setIsOpen(false);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        role="combobox"
        aria-label={label}
      >
        {selectedValues.length === 0 && (
          <span className="text-gray-400 dark:text-gray-400 select-none">
            {placeholder}
          </span>
        )}
        {selectedValues.map((val) => {
          const option = options.find((value) => value === val);
          return (
            <span
              key={val}
              className="flex items-center bg-primary dark:bg-secondary-dark text-white rounded-md px-2 py-1 text-sm select-none"
            >
              {val}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelected(val);
                }}
                className="ml-1 hover:text-gray-300"
                aria-label={`Remove ${val}`}
              >
                <MdClose size={16} />
              </button>
            </span>
          );
        })}

        <div className="grow" /> {/* Spacer */}

        {/* Dropdown icon */}
        <span className="text-gray-500 dark:text-white select-none pointer-events-none">
          {isOpen ? <MdArrowDropUp size={24} /> : <MdArrowDropDown size={24} />}
        </span>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <ul
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg
                     dark:bg-secondary-dark dark:text-white dark:border-white"
          role="listbox"
          aria-multiselectable="true"
        >
          {options.map(( value ) => {
            const checked = selectedValues.includes(value);
            return (
              <li
                key={value}
                className={`flex items-center gap-2 px-3 py-2 cursor-pointer select-none
                hover:bg-blue-100 dark:hover:bg-gray-700 ${
                  checked ? "bg-blue-100 dark:bg-gray-700" : ""
                }`}
                onClick={() => toggleOption(value)}
                role="option"
                aria-selected={checked}
                tabIndex={-1}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleOption(value)}
                  className="cursor-pointer"
                  tabIndex={-1}
                  aria-label={`Select ${value}`}
                />
                <span>{value}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

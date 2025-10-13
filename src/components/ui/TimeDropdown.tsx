import { useRef, useEffect } from "react";

type TimeDropdownProps = {
  values: string[];
  selected: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  selectedRef: React.RefObject<HTMLLIElement>;
  className?: string;
}; 

export default function TimeDropdown({
  values,
  selected,
  isOpen,
  onToggle,
  onSelect,
  selectedRef,
  className
}: TimeDropdownProps) {
  const ulRef = useRef<HTMLUListElement>(null);

  // Reduce scroll speed
  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // stop default scroll
      const slowFactor = 0.3; // 30% of normal speed
      ul.scrollTop += e.deltaY * slowFactor;
    };

    ul.addEventListener("wheel", handleWheel, { passive: false });
    return () => ul.removeEventListener("wheel", handleWheel);
  }, [isOpen]);

  return (
    <div className="relative">
      <div
      role="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`cursor-pointer border rounded-sm p-3 bg-white dark:bg-transparent text-nowrap ${className}`}
      >
        {selected || "--"}
      </div>
      {isOpen && (
        <ul
          ref={ulRef}
          className={`fixed left-[${ulRef.current?.clientLeft}px] top-[${ulRef.current?.clientTop}px] max-h-[100px] overflow-auto bg-white shadow-sm rounded-sm z-50`}
          style={{ scrollbarWidth: "none" }}
        >
          {values.map((value) => (
            <li
              key={value}
              ref={value === selected ? selectedRef : null}
              className={`p-2 cursor-pointer ${
                value === selected
                  ? "bg-primary text-white dark:bg-primary-dark"
                  : "hover:bg-secondary-dark hover:text-white dark:bg-primary-dark"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(value);
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

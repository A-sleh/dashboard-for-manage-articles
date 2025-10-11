"use client";

import React, { useEffect, useRef, useState } from "react";
import { genterateTimes } from "@/utils/helper";
import TimeDropdown from "@/components/ui/TimeDropdown";
import { Times } from "@/stores/Working-hours-store/WorkingHoursStore";

export default function TimesInput({
  times,
  setTimes,
  label = "",
  className = "",
}: {
  times: Times;
  label?: string;
  className?: string;
  setTimes: React.Dispatch<React.SetStateAction<Times>>;
}) {
  const [openList, setOpenList] = useState<"hours" | "minutes" | null>(null);

  const selectedHoursRef = useRef<HTMLLIElement | null>(null);
  const selectedMinutesRef = useRef<HTMLLIElement | null>(null);

  const hours = genterateTimes(24);
  const minutes = genterateTimes(60);

  useEffect(() => {
    const handleClickOutside = () => setOpenList(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (openList === "hours" && selectedHoursRef.current) {
      selectedHoursRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
    if (openList === "minutes" && selectedMinutesRef.current) {
      selectedMinutesRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [openList]);

  return (
    <div>
      {label && <h3 className="text-primary">{label}</h3>}
      <div className="flex gap-2 items-center">
        <TimeDropdown
          values={hours}
          selected={times.hours}
          isOpen={openList === "hours"}
          onToggle={() => setOpenList(openList === "hours" ? null : "hours")}
          onSelect={(value) => {
            setTimes((prev) => ({ ...prev, hours: value }));
            setOpenList("minutes");
          }}
          selectedRef={selectedHoursRef}
          className={className}
        />

        <span>:</span>

        <TimeDropdown
          values={minutes}
          selected={times.minutes}
          isOpen={openList === "minutes"}
          onToggle={() =>
            setOpenList(openList === "minutes" ? null : "minutes")
          }
          onSelect={(value) => {
            setTimes((prev) => ({ ...prev, minutes: value }));
            setOpenList(openList === "minutes" ? null : "minutes");
          }}
          selectedRef={selectedMinutesRef}
          className={className}
        />
      </div>
    </div>
  );
}

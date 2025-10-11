"use client";

import React, { useEffect, useRef, useState } from "react";
import { genterateTimes, validTimeOrder } from "@/utils/helper";

import TimeDropdown from "@/components/ui/TimeDropdown";
import { newRangePayload } from "@/stores/Working-hours-store/WorkingHoursStore";
import { useTimesHours } from "@/context/workingHours/WorkingTimesProvider";
import { errorToast } from "@/components/custom/toast";
import { useTranslations } from "next-intl";

export default function MiniTimeInput({
  label = "",
  timeType,
  className = "",
  range,
  isDisabled = false,
}: {
  range: newRangePayload;
  label?: string;
  timeType: "start" | "end";
  className?: string;
  isDisabled?: boolean;
}) {
  const t = useTranslations("working-hours");
  const [openList, setOpenList] = useState<"hours" | "minutes" | null>(null);
  const { updateRangeTimeOfDay } = useTimesHours();

  const selectedHoursRef = useRef<HTMLLIElement | null>(null);
  const selectedMinutesRef = useRef<HTMLLIElement | null>(null);

  const hours = genterateTimes(24);
  const minutes = genterateTimes(60);

  function validSelectedTimes(value: string, key: "hours" | "minutes") {
    // To prevent user to enter end time before start time
    const startTime =
      timeType == "start"
        ? { ...range[timeType], [key]: value }
        : range["start"];

    const endTime =
      timeType == "end" ? { ...range[timeType], [key]: value } : range["end"];

    return validTimeOrder(startTime, endTime);
  }

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
      <div className="flex items-center bg-white dark:bg-transparent p-1">
        <TimeDropdown
          values={hours}
          selected={range[timeType].hours}
          isOpen={openList === "hours"}
          onToggle={() => {
            if (isDisabled) return;

            setOpenList(openList === "hours" ? null : "hours");
          }}
          onSelect={(value) => {
            if (validSelectedTimes(value, "hours")) {
              errorToast(t("start-before-end-error"));
              return;
            }
            updateRangeTimeOfDay(range.day, range.id, timeType, {
              hours: value,
            });
            setOpenList('minutes'); // Open the next list when the user select hours
          }}
          selectedRef={selectedHoursRef}
          className={className}
        />
        <TimeDropdown
          values={minutes}
          selected={range[timeType].minutes}
          isOpen={openList === "minutes"}
          onToggle={() => {
            if (isDisabled) return;
            setOpenList(openList === "minutes" ? null : "minutes");
          }}
          onSelect={(value) => {
            if (validSelectedTimes(value, "minutes")) {
              errorToast(t("start-before-end-error"));
              return;
            }
            updateRangeTimeOfDay(range.day, range.id, timeType, {
              minutes: value,
            });
            setOpenList(openList === "minutes" ? null : "minutes"); // Close the list after select minute
          }}
          selectedRef={selectedMinutesRef}
          className={className}
        />
      </div>
    </div>
  );
}

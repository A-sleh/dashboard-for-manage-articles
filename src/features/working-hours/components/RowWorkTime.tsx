"use client";

import { useTranslations } from "next-intl";

import {
  DayKey,
  useWorkingHours,
  WorkingHours,
} from "@/stores/Working-hours-store/WorkingHoursStore";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAuth } from "@/stores/Auth-store/Auth-srore";

import Time from "./Time";
import AddNewTimeFrom from "./AddNewTimeFrom";

export default function RowWorkTime({
  workTime,
  dayKey
}: {
  workTime: WorkingHours;
  dayKey: DayKey;
}) {
  const t = useTranslations("working-hours");
  const user = useAuth((state) => state.user);

  const { changeDayStatus } = useWorkingHours((state) => state);

  return (
    <div
      className={`px-4 py-1 border rounded-sm transition-all flex flex-col md:flex-row md:items-center gap-3 ${
        workTime.isActive
          ? "border-primary bg-primary/5"
          : "border-gray-300  opacity-50"
      }`}
    >
      {/* Day & Checkbox */}
      <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-200 font-medium">
        <input
          type="checkbox"
          checked={workTime.isActive}
          onChange={() => changeDayStatus(user?.id || 0, dayKey)}
          className="accent-primary h-4 w-4 rounded-sm cursor-pointer"
        />
        {t(`days.${dayKey}`)}
      </label>

      {/* Times & Add Button */}
      <div className="flex-1 flex justify-between items-center" >
        <div className="flex gap-2 items-center flex-wrap">
          {workTime.ranges.map((range) => (
            <Time
              key={range.id}
              range={{ ...range, day: dayKey }}
              isDisabled={!workTime.isActive}
            />
          ))}
        </div>
        <button disabled={!workTime.isActive}>
          <AddNewTimeFrom dayKey={dayKey}>
            <IoIosAddCircleOutline
              size={28}
              className="text-primary cursor-pointer hover:scale-110 transition-transform"
              title={t("add-range")}
            />
          </AddNewTimeFrom>
        </button>
      </div>
    </div>
  );
}

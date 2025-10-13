"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdClose } from "react-icons/md";

import {
  DayKey,
  Times,
  useWorkingHours,
} from "@/stores/Working-hours-store/WorkingHoursStore";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

import Model from "@/components/Model/Model";
import TimesInput from "./TimesInput";
import { errorToast, successToast } from "@/components/custom/toast";
import { delayChangeState, timeToMinutes, validTimeOrder } from "@/utils/helper";

const initialTime: Times = { hours: "", minutes: "" };

export default function AddNewTimeForm({
  children,
  dayKey,
}: {
  children: React.ReactElement;
  dayKey: DayKey;
}) {
  const t = useTranslations("working-hours");
  const user = useAuth((state) => state.user);
  const lang = useNavSetting((state) => state.lang);

  const { addNewRange } = useWorkingHours((state) => state);

  const [startTime, setStartTime] = useState<Times>(initialTime);
  const [endTimes, setEndTimes] = useState<Times>(initialTime);
  const [closeModel, setCloseModel] = useState(false);
  const [loading, setLoading] = useState(false);

  function areEmptyFileds(startTime: Times, endTimes: Times) {
    return (
      !startTime.hours ||
      !endTimes.hours ||
      !startTime.minutes ||
      !endTimes.minutes
    );
  }

  async function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // If there is a filed was empty
    if (areEmptyFileds(startTime, endTimes)) {
      errorToast(t("fill-all-fields-error"));
      setLoading(false);
      return;
    }

    if (validTimeOrder(startTime,endTimes)) {
      errorToast(t("start-before-end-error"));
      setLoading(false);
      return;
    }

    try {
      await addNewRange(user?.id || 0, {
        id: 0,
        start: startTime,
        end: endTimes,
        day: dayKey,
      });
      successToast(t("add-new-range-noti-success"));
      delayChangeState(setCloseModel);
    } catch (err) {
      errorToast(t("add-new-range-noti-error"));
    } finally {
      setLoading(false);
    }
  }

  // Reset times whenever modal closes
  useEffect(() => {
    if (closeModel) {
      setStartTime(initialTime);
      setEndTimes(initialTime);
    }
  }, [closeModel]);

  return (
    <Model outCloseAction={closeModel}>
      <Model.Open opens="new-range-time">{children}</Model.Open>

      <Model.Window name="new-range-time">
        <div className="flex flex-col items-center rounded-2xl bg-white dark:bg-primary-dark text-primary dark:text-gray-100 w-[90%] md:min-w-[28vw] p-6 shadow-lg">
          <Model.Close>
            <button className="flex justify-end w-full p-1 cursor-pointer ">
              <MdClose size={24} />
            </button>
          </Model.Close>
          <h3 className="mb-6 text-xl font-semibold text-primary-dark dark:text-gray-100">
            {t("pick-time")}
          </h3>

          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col w-full gap-6"
          >
            {/* Time Inputs */}
            <div className="flex items-end justify-center gap-4">
              <TimesInput
                times={startTime}
                setTimes={setStartTime}
                className="px-3 py-1"
                label={t("start-time")}
              />
              <MdOutlineArrowForwardIos
                size={18}
                className={`text-primary transition-transform mb-2 ${
                  lang === "ar" ? "rotate-180" : ""
                }`}
              />
              <TimesInput
                times={endTimes}
                className="px-3 py-1"
                setTimes={setEndTimes}
                label={t("end-time")}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-start">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary  text-white dark:text-primary-dark rounded-lg shadow-md hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "..." : t("add")}
              </button>
            </div>
          </form>
        </div>
      </Model.Window>
    </Model>
  );
}

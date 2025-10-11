"use client";

import React from "react";
import { useTranslations } from "next-intl";

import WorkingTimesProvider from "@/context/workingHours/WorkingTimesProvider";
import WorkinHoursList from "./WorkinHoursList";
import AnimateDownEffect from "@/lib/Animation/AnimateDownEffect";

export default function WorkingHoursLayout() {
  const t = useTranslations("working-hours");
  
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <AnimateDownEffect className="flex bg-primary dark:bg-primary-dark text-white rounded-md overflow-hidden border border-primary">
        <span className=" px-8 py-2 bg-white text-primary dark:text-primary-dark font-semibold">
          {t("day")}
        </span>
        <span className="flex-2 px-4 py-2 font-semibold">
          {t("work-time-title")}
        </span>
      </AnimateDownEffect>
      {/* Work Hours Rows */}
      <WorkingTimesProvider>
        <WorkinHoursList />
      </WorkingTimesProvider>
    </div>
  );
}

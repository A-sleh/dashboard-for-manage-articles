"use client";

import React from "react";

import { useTimesHours } from "@/context/workingHours/WorkingTimesProvider";
import { DayKey } from "@/stores/Working-hours-store/WorkingHoursStore";

import RowWorkTime from "./RowWorkTime";
import AnimateParentLeftEffect, {
  AnimateChildLeftEffect,
} from "@/lib/Animation/AnimateParentLeftEffect";

export default function WorkinHoursList() {
  const { workingTimes } = useTimesHours();

  return (
    <AnimateParentLeftEffect className="flex flex-col gap-3">
      {Object.keys(workingTimes.days).map((key,Idx: number) => {
        const dayKey: DayKey = key as DayKey;
        return (
          <AnimateChildLeftEffect duration={Idx / 3}>
            <RowWorkTime
              key={dayKey}
              workTime={workingTimes.days[dayKey]}
              dayKey={dayKey}
            />
          </AnimateChildLeftEffect>
        );
      })}
    </AnimateParentLeftEffect>
  );
}

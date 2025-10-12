"use client";

import React from "react";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import {
  newRangePayload,
  useWorkingHours,
} from "@/stores/Working-hours-store/WorkingHoursStore";

import { AiOutlineDelete } from "react-icons/ai";
import { MdContentCopy, MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import MiniTimeInput from "./MiniTimeInput";
import { useTimesHours } from "@/context/workingHours/WorkingTimesProvider";
import ConfirmModal from "@/components/Model/ConfirmModel";
import { useTranslations } from "next-intl";
import { successToast } from "@/components/custom/toast";
import AnimateScale from "@/lib/Animation/AnimateScale";

export default function Time({
  range,
  isDisabled,
}: {
  range: newRangePayload;
  isDisabled: boolean;
}) {
  const t = useTranslations("working-hours");
  const user = useAuth((state) => state.user);
  const lang = useNavSetting((state) => state.lang);

  const { handleDoublicatRange } = useTimesHours();
  const { deleteRangeTime } = useWorkingHours((state) => state);

  // Prevent actions when disabled
  const handleDoublicat = () => !isDisabled && handleDoublicatRange(range);
  const handleDelelteRange = () => {
    deleteRangeTime(user?.id || 0, range);
    successToast(t("delelte-range-success-not"));
  };

  return (
    <AnimateScale
      className={`flex items-center gap-0.5 rounded-xs bg-white dark:bg-primary-dark p-1 transition-all `}
    >
      {/* Time Display / Inputs */}
      <div className="flex items-center text-sm text-gray-800 dark:text-gray-200 ">
        <MiniTimeInput
          range={range}
          timeType="start"
          isDisabled={isDisabled}
          className="p-[5px] text-sm border "
        />
        <MdOutlineArrowForwardIos
          size={10}
          className={`text-primary ${lang === "ar" ? "rotate-180" : ""}`}
        />
        <MiniTimeInput
          range={range}
          isDisabled={isDisabled}
          timeType="end"
          className="p-[5px] text-sm border"
        />
      </div>

      {/* Action Icons */}
      <MdContentCopy
        size={16}
        onClick={handleDoublicat}
        className="text-gray cursor-pointer hover:scale-110 transition dark:text-white"
        title="Delete"
      />
      <ConfirmModal
        ModalKey="delete-range"
        handleApply={handleDelelteRange}
        message={t("confirm-delete-message")}
      >
        <button disabled={isDisabled}>
          <AiOutlineDelete
            size={16}
            className="text-red-500 cursor-pointer hover:scale-110 transition"
            title="Delete"
          />
        </button>
      </ConfirmModal>
    </AnimateScale>
  );
}

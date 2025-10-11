"use client";

import { useTranslations } from "next-intl";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";
import { successToast } from "@/components/custom/toast";
import UpplayChangesModel from "@/components/Model/UpplayChangesModel";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import {
  DayKey,
  IUserWorkingHours,
  newRangePayload,
  useWorkingHours,
} from "@/stores/Working-hours-store/WorkingHoursStore";

type IWorkingTimesContext = {
  workingTimes: IUserWorkingHours;
  setWorkingTimes: Dispatch<SetStateAction<IUserWorkingHours>>;
  handleDoublicatRange: (range: newRangePayload) => void;
  updateRangeTimeOfDay: (
    day: DayKey,
    rangeId: number,
    rangeType: "start" | "end",
    body: any
  ) => void;
};

const WorkingTimesContext = createContext<null | IWorkingTimesContext>(null);

export default function WorkingTimesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("model");

  const userId = useAuth((state) => state.user)?.id || 0;
  const { getUserWorkingHours, addNewRange, replaceUserWorkingHours } =
    useWorkingHours((state) => state);

  const [showModal, setShowModal] = useState(false);
  const workingTimes = getUserWorkingHours(userId);
  const [tempWorkingTime, setTempWorkingTime] =
    useState<IUserWorkingHours>(workingTimes);

  const handleApply = () => {

    replaceUserWorkingHours(userId, tempWorkingTime);
    successToast(t("success-update-working-times"));
    setShowModal(false);
  };

  const handleCancel = () => {
    // Reset temp back to initial
    setTempWorkingTime(workingTimes);
    setShowModal(false);
  };

  const updateRangeTimeOfDay = (
    day: DayKey,
    rangeId: number,
    rangeType: "start" | "end",
    body: any
  ) => {
    setTempWorkingTime((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          ranges: prev.days[day].ranges.map((r) =>
            r.id === rangeId
              ? {
                  ...r,
                  [rangeType]: {
                    ...r[rangeType],
                    ...body,
                  },
                }
              : r
          ),
        },
      },
    }));
  };

  const handleDoublicatRange = async (range: newRangePayload) => {
    await Object.keys(workingTimes.days).map((key) => {
      const dayKey: DayKey = key as DayKey;
      // Skip adds to the parent of selected range
      if (dayKey != range.day) {
        try {
          addNewRange(userId, { ...range, day: dayKey });
        } catch (err) {
          // console.log("handle error", err);
        }
      }
    });
    successToast(t("success-copy-ranges"));
  };

  // Update the context when the store was changed
  useEffect(() => {
    setTempWorkingTime(workingTimes);
  }, [workingTimes]);

  // Compare initial vs temp
  useEffect(() => {
    const hasChanges =
      JSON.stringify(tempWorkingTime) !== JSON.stringify(workingTimes);
    setShowModal(hasChanges);
  }, [tempWorkingTime, workingTimes]);

  return (
    <WorkingTimesContext.Provider
      value={{
        workingTimes: tempWorkingTime,
        setWorkingTimes: setTempWorkingTime,
        handleDoublicatRange,
        updateRangeTimeOfDay,
      }}
    >
      {children}
      <UpplayChangesModel
        handleApply={handleApply}
        handleCancel={handleCancel}
        message={t("unsaved-message")}
        showModal={showModal}
      />
    </WorkingTimesContext.Provider>
  );
}

export const useTimesHours = () => {
  const context = useContext(WorkingTimesContext);
  if (!context) {
    throw new Error("You try to use context outside of provider");
  }
  return context;
};

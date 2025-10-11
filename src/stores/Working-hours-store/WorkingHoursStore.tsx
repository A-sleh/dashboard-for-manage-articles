import { isTimeRangeValid } from "@/utils/helper";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Times = {
  hours: string;
  minutes: string;
};

export type Range = {
  id: number;
  start: Times;
  end: Times;
};

export type WorkingHours = {
  isActive: boolean;
  ranges: Range[];
};

export type IUserWorkingHours = {
  userId: number;
  days: {
    sun: WorkingHours;
    mon: WorkingHours;
    tue: WorkingHours;
    wed: WorkingHours;
    thu: WorkingHours;
    sat: WorkingHours;
  };
};

type workingHoursStates = {
  usersWorkingHours: IUserWorkingHours[];
};

export type DayKey = keyof IUserWorkingHours["days"];

export type newRangePayload = Range & {
  day: DayKey;
};

type deletePayload = Range & {
  day: DayKey;
};

type workingHoursActions = {
  intialUserWorkingHours: (userId: number) => void;
  addNewRange: (userId: number, body: newRangePayload) => void;
  updateRange: (userId: number, body: newRangePayload) => void;
  deleteRangeTime: (userId: number, body: deletePayload) => void;
  changeDayStatus: (userId: number, day: DayKey) => void;
  replaceUserWorkingHours: (userId: number, body: IUserWorkingHours) => void;
  getUserWorkingHours: (userId: number) => IUserWorkingHours; // can be undefined
};

export type workingHoursStore = workingHoursStates & workingHoursActions;

const intialState: IUserWorkingHours = {
  userId: 0,
  days: {
    mon: { isActive: false, ranges: [] },
    sat: { isActive: false, ranges: [] },
    sun: { isActive: false, ranges: [] },
    thu: { isActive: false, ranges: [] },
    tue: { isActive: false, ranges: [] },
    wed: { isActive: false, ranges: [] },
  },
};

function validTimes(ranges: Range[], addedRange: newRangePayload): boolean {
  return ranges.some((range) => !isTimeRangeValid(range, addedRange));
}

export function handleIntialUserWorkingHours(
  userId: number,
  usersWorkingHours: IUserWorkingHours[]
): IUserWorkingHours[] {
  const exists = usersWorkingHours.some((u) => u.userId == userId);

  if (exists) {
    return usersWorkingHours.map((u) =>
      u.userId == userId ? { days: u.days, userId } : u
    );
  } else {
    return [...usersWorkingHours, { ...intialState, userId }];
  }
}

// Add a new time range
export function handleAddNewRange(
  user: IUserWorkingHours,
  body: newRangePayload
): IUserWorkingHours {
  const ranges = user.days[body.day].ranges;
  const rangeId = (user.days[body.day].ranges[ranges.length - 1]?.id || 0) + 1;

  return {
    ...user,
    days: {
      ...user.days,
      [body.day]: {
        ...user.days[body.day],
        isActive: true,
        ranges: [...user.days[body.day].ranges, { ...body, id: rangeId }],
      },
    },
  };
}

// Update an existing time range
export function handleUpdateRange(
  user: IUserWorkingHours,
  body: newRangePayload
): IUserWorkingHours {
  return {
    ...user,
    days: {
      ...user.days,
      [body.day]: {
        ...user.days[body.day],
        ranges: user.days[body.day].ranges.map((r) =>
          r.id == body.id ? { ...r, ...body } : r
        ),
      },
    },
  };
}

// Delete a time range
export function handleDeleteRange(
  user: IUserWorkingHours,
  body: deletePayload
): IUserWorkingHours {
  return {
    ...user,
    days: {
      ...user.days,
      [body.day]: {
        ...user.days[body.day],
        ranges: user.days[body.day].ranges.filter((r) => r.id !== body.id),
      },
    },
  };
}

//Handle toggle activate of user day
export function handleToggleActivateUserDay(
  user: IUserWorkingHours,
  day: DayKey
): IUserWorkingHours {
  return {
    ...user,
    days: {
      ...user.days,
      [day]: {
        ...user.days[day],
        isActive: !user.days[day].isActive,
      },
    },
  };
}

export const useWorkingHours = create<workingHoursStore>()(
  persist(
    (set, get) => ({
      usersWorkingHours: [],

      intialUserWorkingHours: (userId) =>
        set((state) => ({
          usersWorkingHours: handleIntialUserWorkingHours(
            userId,
            state.usersWorkingHours
          ),
        })),

      addNewRange: (userId, body) => {
        const user = get().usersWorkingHours.find((u) => u.userId == userId);
        if (!user) throw new Error("User not found");

        const existingRanges = user.days[body.day].ranges;

        if (validTimes(existingRanges, body)) {
          throw new Error("The new time range overlaps with existing ranges.");
        }

        // Add the new range
        set((state) => ({
          usersWorkingHours: state.usersWorkingHours.map((user) =>
            user.userId == userId ? handleAddNewRange(user, body) : user
          ),
        }));
      },

      updateRange: (userId, body) =>
        set((state) => ({
          usersWorkingHours: state.usersWorkingHours.map((user) =>
            user.userId == userId ? handleUpdateRange(user, body) : user
          ),
        })),
      replaceUserWorkingHours: (userId, body) =>
        set((state) => ({
          usersWorkingHours: state.usersWorkingHours.map((user) =>
            user.userId == userId ? body : user
          ),
        })),
      deleteRangeTime: (userId, body) =>
        set((state) => ({
          usersWorkingHours: state.usersWorkingHours.map((user) =>
            user.userId == userId ? handleDeleteRange(user, body) : user
          ),
        })),

      changeDayStatus: (userId, day) =>
        set((state) => ({
          usersWorkingHours: state.usersWorkingHours.map((user) =>
            user.userId == userId
              ? handleToggleActivateUserDay(user, day)
              : user
          ),
        })),

      getUserWorkingHours: (userId): IUserWorkingHours =>
        get().usersWorkingHours.find((u) => u.userId == userId) || {
          ...intialState,
          userId,
        },
    }),
    {
      name: "working-hours",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

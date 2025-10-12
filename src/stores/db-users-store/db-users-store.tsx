import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ICredential } from "../Auth-store/Auth-srore";

// ========== Types ==========
export type IUser = {
  id: number;
  gemail: string;
  password: string;
  image?: string | null;
  firstName: string;
  lastName: string;
};

export type dbUserState = {
  dbUsers: IUser[];
};

export type dbUserActions = {
  userIsExisit: (gemail: string, password: string) => IUser | null;
  updateUserCreadential: (body: ICredential, userId: number) => void;
  addUser: (body: IUser) => IUser;
};

export type DbUserStore = dbUserState & dbUserActions;

// ========== Initial State ==========
export const intialDbUsersStore: dbUserState = {
  dbUsers: [],
};

// ========== Helpers ==========

function checkExisitingUser(
  gemail: string,
  password: string,
  dbUsers: IUser[]
) {
  
  return (
    dbUsers.find(
      (user) => user.gemail == gemail && user.password == password
    ) || null
  );
}

function findUserByEmail(gemail: string, dbUsers: IUser[]) {
  return dbUsers.find((user) => user.gemail == gemail);
}

function updateUserCreadential(
  body: ICredential,
  userId: number,
  dbUsers: IUser[]
) {
  return dbUsers.map((user) => {
    if (user.id == userId) {
      return { ...user, ...body };
    }
    return user;
  });
}

// ========== Zustand Store ==========

export const useDbUsers = create<DbUserStore>()(
  persist(
    (set, get) => ({
      ...intialDbUsersStore,

      userIsExisit: (gemail, password) =>
        checkExisitingUser(gemail, password, get().dbUsers),

      updateUserCreadential: (body, userId) => {
        const currentUsers = get().dbUsers;
        const existingUser = findUserByEmail(body.gemail, currentUsers);

        if(existingUser && existingUser.id != userId) {
            throw new Error("Some thing went wrong")
        }

        set((state) => ({
          dbUsers: updateUserCreadential(body, userId, state.dbUsers),
        }))
      }
        ,

      addUser: (body: IUser) => {
        const currentUsers = get().dbUsers;
        const existingUser = findUserByEmail(body.gemail, currentUsers);

        if (existingUser) {
          if (existingUser.password == body.password) {
            // User exists with same credentials
            throw new Error("This user already exists.");
          } else {
            // Email exists, but password does not match
            throw new Error("Some thing went wrong")
          }
        }

        const newId = (currentUsers[currentUsers.length - 1]?.id || 0) + 1;
        const newUser: IUser = { ...body, id: newId };

        set((state) => ({
          dbUsers: [...state.dbUsers, newUser],
        }));

        return newUser
      },
    }),
    {
      name: "db.users",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

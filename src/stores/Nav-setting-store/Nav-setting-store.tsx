import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ========== Types ==========

type NavSettings = {
  isDarkMode: boolean;
  lang: "en" | "ar";
  openSidebar: boolean;
};

type NavSettingsActions = {
  toggleTheme: () => void;
  changeLang: (lang: "en" | "ar") => void;
  toggleSidebarView: () => void;
};

export type NavSettingsStore = NavSettings & NavSettingsActions;

// ========== Initial State ==========

const initialNavSettings: NavSettings = {
  isDarkMode: false,
  lang: "en",
  openSidebar: false,
};

// ========== helpers ========
async function changeLocaleLangeFromServer(locale: string) {
  // Call an API route to update the cookie
  await fetch("/api/set-cookies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ locale }),
  });
}

// ========== Store ==========

export const useNavSetting = create<NavSettingsStore>()(
  persist(
    (set, get) => {
      return {
        ...initialNavSettings,

        toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

        toggleSidebarView: () =>
          set((state) => ({ openSidebar: !state.openSidebar })),

        changeLang: async (lang) => {
          await changeLocaleLangeFromServer(lang);
          set({ lang });
        },
      };
    },
    {
      name: "nav-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

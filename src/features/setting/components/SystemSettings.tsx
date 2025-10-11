"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { VscColorMode } from "react-icons/vsc";
import { IoLanguageOutline } from "react-icons/io5";

import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import SettingLayout from "@/components/ui/SettingLayout";
import ToggleButton from "@/components/ui/ToggleButton";
import LanguageToggleButton from "@/components/ui/LanguageToggleButton";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";

const SystemSettings: FC = () => {
  const t = useTranslations("settings.systemSettings");
  const { toggleTheme, isDarkMode } = useNavSetting((state) => state);

  return (
    <div className="flex flex-col gap-6 w-full">
      <AnimateFromToRight duration={0.3}>
        <SettingLayout
          icon={<IoLanguageOutline size={22} />}
          title={t("language")}
          description={t("language-desc")}
        >
          <LanguageToggleButton
            aria-label={t("language-toggle")}
            className="bg-primary dark:bg-primary/80 text-white px-4 py-1.5 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all min-w-[100px] text-center"
          />
        </SettingLayout>
      </AnimateFromToRight>

      <AnimateFromToRight duration={0.6}>
        <SettingLayout
          icon={<VscColorMode size={22} />}
          title={t("theme")}
          description={t("theme-desc")}
        >
          <ToggleButton
            aria-label={t("theme-toggle")}
            onChangeFn={toggleTheme}
            value={isDarkMode}
            className="transition-transform duration-300 hover:scale-105 focus:ring-2 focus:ring-primary rounded-full"
          />
        </SettingLayout>
      </AnimateFromToRight>
    </div>
  );
};

export default SystemSettings;

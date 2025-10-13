"use client";

import { useRouter } from "next/router";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

export default function LanguageToggleButton({className = ''}: {
  className?: string
}) {
  const { lang, changeLang } = useNavSetting();
  const router = useRouter();

  const toggleLanguage = async () => {
    const newLang = lang === "ar" ? "en" : "ar";
    await changeLang(newLang);
    router.reload()
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`p-1 px-2 rounded-xs font-bold cursor-pointer ${className ? className: 'bg-white'}`}
    >
      {lang}
    </button>
  );
}

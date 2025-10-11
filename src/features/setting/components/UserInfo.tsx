"use client";

import { FormEvent, useRef, useState } from "react";
import { ICredential, useAuth } from "@/stores/Auth-store/Auth-srore";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { Input } from "@/components/ui/Input";

import { Button } from "@/components/ui/Button";
import { IoMdSettings, IoMdCloseCircleOutline } from "react-icons/io";
import { errorToast, successToast } from "@/components/custom/toast";
import { useTranslations } from "next-intl";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";

export default function UserInfo() {
  const t = useTranslations("settings.userInfo");
  const { user, updateUserCredential } = useAuth((state) => state);
  const lang = useNavSetting((state) => state.lang);

  const initialValues: ICredential = {
    gemail: user?.gemail || "",
    password: user?.password || "",
  };

  const [update, setUpdate] = useState(false);
  const [form, setForm] = useState<ICredential>(initialValues);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserCredential(form);
      successToast(t("update-success"));
      setUpdate(false);
    } catch (err) {
      errorToast(t("error-gmail-already-used"));
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex flex-col gap-4 flex-2 w-full p-5 bg-white dark:bg-primary-dark rounded-2xl shadow-sm hover:shadow-md transition-all dark:text-white border border-gray-100 dark:border-gray-700"
    >
      <AnimateFromToRight offsetValue={100}>
        {update ? (
          <IoMdCloseCircleOutline
            size={22}
            className={`text-red-500 dark:text-red-400 cursor-pointer absolute ${
              lang === "ar" ? "left-3" : "right-3"
            } top-3 hover:scale-110 transition`}
            onClick={() => {
              setUpdate(false);
              setForm(initialValues);
            }}
            title={t("cancel")}
          />
        ) : (
          <IoMdSettings
            size={22}
            className={`text-primary dark:text-white cursor-pointer absolute z-30 ${
              lang === "ar" ? "left-3" : "right-3"
            } top-3 hover:rotate-90 transition`}
            onClick={() => {
              setUpdate(true);
              inputRef.current?.focus();
            }}
            title={t("edit")}
          />
        )}

        <Input
          readOnly={!update}
          value={form.gemail}
          required={true}
          onChange={(e) => setForm({ ...form, gemail: e.target.value })}
          label={t("email-label")}
          type="email"
          placeHolder="you@example.com"
          className="dark:bg-primary-dark"
          labelStyle="dark:text-white"
          ref={inputRef}
        />

        <Input
          readOnly={!update}
          value={form.password}
          required={true}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          label={t("password-label")}
          type="password"
          placeHolder="••••••••"
          labelStyle="dark:text-white"
          className="dark:bg-primary-dark"
        />

        {update && (
          <Button
            variant="secondary"
            className="mt-2 bg-primary dark:bg-secondary-dark text-white  px-4 py-2 hover:text-white rounded-lg shadow hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer"
          >
            {t("apply")}
          </Button>
        )}
      </AnimateFromToRight>
    </form>
  );
}

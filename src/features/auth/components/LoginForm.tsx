"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { errorToast, successToast } from "@/components/custom/toast";
import AnimateScale from "@/lib/Animation/AnimateScale";
import { Input } from "@/components/ui/Input";

import ChangeLink from "./ChangeLink"; 
import { ICredential, useAuth } from "@/stores/Auth-store/Auth-srore";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";

const intialValue: ICredential = {
  gemail: "",
  password: "",
};

export default function LoginForm() {
  const t = useTranslations("login");
  const router = useRouter();

  const login = useAuth((state) => state.login);
  const [user, setUser] = useState<ICredential>(intialValue);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(user);
      router.replace("/app/articles");
      successToast(t("login-success"));
    } catch (err) {
      errorToast(t("error-invalid-credentials"));
    }
  };

  return (
    <AnimateScale>
      <form
        onSubmit={onSubmit}
        className="p-4 rounded-md bg-white shadow-md w-full space-y-2"
      >
        <AnimateFromToRight>
          <Input
            label={t("email-label")}
            placeHolder={t("email-placeholder")}
            required={true}
            type="email"
            value={user.gemail}
            onChange={(e) => setUser({ ...user, gemail: e.target.value })}
          />
        </AnimateFromToRight>
        <AnimateFromToRight>
          <Input
            label={t("password-label")}
            placeHolder={t("password-placeholder")}
            required={true}
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </AnimateFromToRight>

        <AnimateScale>
          <button className="bg-primary dark:bg-secondary-dark rounded-md text-white px-2 py-1 my-2  cursor-pointer w-full transition-all hover:text-black hover:bg-white hover:outline-primary  hover:outline-1">
            {t("login-button")}
          </button>
        </AnimateScale>
        <ChangeLink
          link="/auth/signup"
          btn={t("signup-btn")}
          desctiption={t("dont-have-account")}
        />
      </form>
    </AnimateScale>
  );
}

"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { getFileUrl } from "@/utils/helper";
import { errorToast, successToast } from "@/components/custom/toast";
import { Input } from "@/components/ui/Input";
import FileInput from "@/components/ui/FileInput";
import AnimateScale from "@/lib/Animation/AnimateScale";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";

import ChangeLink from "./ChangeLink"; 
import { IUser } from "@/stores/db-users-store/db-users-store";
import { useAuth } from "@/stores/Auth-store/Auth-srore";

const intialValue: IUser = {
  id: 0,
  gemail: "",
  password: "",
  image: "",
  firstName: "",
  lastName: "",
};

export default function SignupForm() {
  const t = useTranslations("signup");
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState(""); // For file input display
  const [user, setUser] = useState<IUser>(intialValue);

  const signup = useAuth((state) => state.signup);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup(user);
      router.replace("/app/articles");
      successToast(t("signup-success"));
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  const handleFileSelected = async (
    selectedFiles: ChangeEvent<HTMLInputElement>
  ) => {
    if (!selectedFiles?.target?.files) return;

    try {
      const imageUrl = await getFileUrl(selectedFiles.target.files[0]);
      setImageUrl(selectedFiles.target.value); // To display filename in file input

      setUser({
        ...user,
        image: imageUrl,
      });
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  return (
    <AnimateScale>
      <form
        onSubmit={onSubmit}
        className="p-4 rounded-md bg-white shadow-md w-full space-y-2"
      >
        <AnimateFromToRight  className="flex flex-col md:flex-row gap-2">
          <Input
            label={t("first-name-label")}
            placeHolder={t("first-name-placeholder")}
            required={true}
            type="text"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <Input
            label={t("last-name-label")}
            placeHolder={t("last-name-placeholder")}
            required={true}
            type="text"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </AnimateFromToRight>
        <AnimateFromToRight delay={0.2}>
          <Input
            label={t("email-label")}
            placeHolder={t("email-placeholder")}
            required={true}
            type="email"
            value={user.gemail}
            onChange={(e) => setUser({ ...user, gemail: e.target.value })}
          />
          <Input
            label={t("password-label")}
            placeHolder={t("password-placeholder")}
            required={true}
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <FileInput
            label={t("image-label") ?? "Image"}
            placeHolder={t("image-placeholder") ?? "Enter avatar image"}
            onChange={handleFileSelected}
            value={imageUrl}
          />
        </AnimateFromToRight>
        <AnimateScale>
          <button className="bg-primary dark:bg-secondary-dark rounded-md my-2 text-white px-2 py-1 cursor-pointer w-full transition-all hover:text-black hover:bg-white hover:outline-primary  hover:outline-1">
            {t("login-button")}
          </button>
        </AnimateScale>
        <ChangeLink
          link="/auth/login"
          btn={t("login-btn")}
          desctiption={t("already-have-account")}
        />
      </form>
    </AnimateScale>
  );
}

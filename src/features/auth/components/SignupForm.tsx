"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { getFileUrl } from "@/utils/helper";
import { errorToast, successToast } from "@/components/custom/toast";
import { FormInput } from "@/components/ui/FormInput";
import FileInput from "@/components/ui/FileInput";
import AnimateScale from "@/lib/Animation/AnimateScale";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";

import ChangeLink from "./ChangeLink";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import SubmitBtn from "@/components/ui/SubmitBtn";

export default function SignupForm() {

  const signup = useAuth((state) => state.signup);

  const t = useTranslations("signup");
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");

  const signupSchema = yup.object({
    id: yup.number().notRequired().nullable(),
    gemail: yup
      .string()
      .required(t("email-req-email-msg"))
      .email(t("email-invalid-email-msg")),
    image: yup.string().notRequired().nullable(),
    firstName: yup.string().required(t("first-name-required-msg")),
    lastName: yup.string().required(t("last-name-required-msg")),
    password: yup.string().required(t("password-req-password-msg")),
  });

  type IFormType = yup.InferType<typeof signupSchema>;

  const { handleSubmit, control, formState, setValue } = useForm<IFormType>({
    defaultValues: {
      id: 0,
      gemail: "",
      password: "",
      image: "",
      firstName: "",
      lastName: "",
    },
    resolver: yupResolver(signupSchema.omit(["id", "image"])),
  });

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<IFormType> = async (data) => {
    try {
      await signup({ ...data, id: 0 });
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
      const fileUrl = await getFileUrl(selectedFiles.target.files[0]);
      setImageUrl(selectedFiles.target.value);
      setValue("image", fileUrl || "");
    } catch (err) {
      errorToast((err as Error).message);
    }
  };

  return (
    <AnimateScale>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 rounded-md bg-white shadow-md w-full space-y-2"
      >
        <AnimateFromToRight className="flex flex-col md:flex-row gap-2">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <FormInput
                label={t("first-name-label")}
                placeHolder={t("first-name-placeholder")}
                error={errors?.firstName?.message}
                type="text"
                {...field}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormInput
                label={t("last-name-label")}
                placeHolder={t("last-name-placeholder")}
                error={errors?.lastName?.message}
                type="text"
                {...field}
              />
            )}
          />
        </AnimateFromToRight>

        <AnimateFromToRight delay={0.2}>
          <Controller
            name="gemail"
            control={control}
            render={({ field }) => (
              <FormInput
                label={t("email-label")}
                placeHolder={t("email-placeholder")}
                error={errors?.gemail?.message}
                type="email"
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormInput
                label={t("password-label")}
                placeHolder={t("password-placeholder")}
                error={errors?.password?.message}
                type="password"
                {...field}
              />
            )}
          />

          <FileInput
            label={t("image-label") ?? "Image"}
            placeHolder={t("image-placeholder") ?? "Enter avatar image"}
            onChange={handleFileSelected}
            value={imageUrl}
          />
        </AnimateFromToRight>

        <AnimateScale>
          <SubmitBtn 
            lable={t("login-button")}
            isLoading={isSubmitting}
          />
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

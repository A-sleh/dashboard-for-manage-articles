"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { errorToast, successToast } from "@/components/custom/toast";
import AnimateScale from "@/lib/Animation/AnimateScale";
import { FormInput } from "@/components/ui/FormInput";

import ChangeLink from "./ChangeLink";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import AnimateFromToRight from "@/lib/Animation/AnimateFromLeftToRight";
import SubmitBtn from "@/components/ui/SubmitBtn";

export default function LoginForm() {
  const t = useTranslations("login");
  const router = useRouter();

  const loginSchema = yup.object({
    gemail: yup
      .string()
      .required(t("email-req-email-msg"))
      .email(t("email-invalid-email-msg")),
    password: yup.string().required(t("password-req-password-msg")),
  });

  type IFormType = yup.InferType<typeof loginSchema>;

  const login = useAuth((state) => state.login);
  const { handleSubmit, control, formState } = useForm<IFormType>({
    defaultValues: {
      gemail: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<IFormType> = async (data) => {
    try {
      await login(data);
      router.replace("/app/articles");
      successToast(t("login-success"));
    } catch (err) {
      errorToast(t("error-invalid-credentials"));
    }
  };

  return (
    <AnimateScale>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 rounded-md bg-white shadow-md w-full space-y-2"
      >
        <AnimateFromToRight>
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
        </AnimateFromToRight>
        <AnimateFromToRight>
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
        </AnimateFromToRight>

        <AnimateScale>
          <SubmitBtn lable={t("login-button")} isLoading={isSubmitting} />
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

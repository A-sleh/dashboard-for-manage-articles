import { ReactElement } from "react";

import { getTranslations } from "next-intl/server";

import { Head } from "@/components/seo";
import LoginForm from "@/features/auth/components/LoginForm";
import AuthLayout from "@/components/layout/AuthLayout";

export default async function Login() {
  const t = await getTranslations("login");
  return (
    <>
      <Head
        title={t("title")}
        description="Login page enter your special information"
      />
      <LoginForm />
    </>
  );
}

Login.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

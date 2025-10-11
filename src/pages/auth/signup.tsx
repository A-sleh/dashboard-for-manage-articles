import { ReactElement } from "react";

import { getTranslations } from "next-intl/server";

import SignupForm from "@/features/auth/components/SignupForm";
import AuthLayout from "@/components/layout/AuthLayout";
import { Head } from "@/components/seo";

export default async function Signup() {
  const t = await getTranslations("signup");
  return (
    <>
      <Head
        title={t("title")}
        description="Signup page to create new account"
      />
      <SignupForm />
    </>
  );
}

Signup.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

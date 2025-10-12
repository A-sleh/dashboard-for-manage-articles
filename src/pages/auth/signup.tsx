import { ReactElement } from "react";

import { useTranslations } from "next-intl";
import SignupForm from "@/features/auth/components/SignupForm";
import AuthLayout from "@/components/layout/AuthLayout";
import { Head } from "@/components/seo";
import { GetServerSideProps } from "next";

export default  function Signup() {
  const t =  useTranslations("signup");
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = require('cookie')
  const cookieHeader = context.req.headers.cookie || "";
  const parsedCookies = cookieHeader ? cookie.parse(cookieHeader) : {};
  const locale = parsedCookies.locale || context.locale ||  "en";
  
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
      locale,
    },
  };
};

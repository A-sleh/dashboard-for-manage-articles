
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";

import { Head } from "@/components/seo";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/features/auth/components/LoginForm";

export default  function Login() {
  const t =  useTranslations("login");
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

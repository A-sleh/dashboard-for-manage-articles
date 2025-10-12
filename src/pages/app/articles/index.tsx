

import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import { Head } from "@/components/seo";
import Header from "@/components/Header";
import ArticlesList from "@/features/articles/components/ArticlesList"; 
import DashBoradLayout from "@/components/layout/DashBoardLayout";
import { GetServerSideProps } from "next";

export default  function Articles() {
  const t = useTranslations("articles");
  return (
    <>
      <Head title={t("title")} description="Manage your articles" />
      <section className="p-4">
        <Header title={t("title")} />
        <ArticlesList />
      </section>
    </>
  );
}

Articles.getLayout = (page: ReactElement) => {
  return <DashBoradLayout>{page}</DashBoradLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = require('cookie')
  const cookieHeader = context.req.headers.cookie || "";
  const parsedCookies = cookieHeader ? cookie.parse(cookieHeader) : {};
  const locale = parsedCookies.locale || context.locale ||  "en";
  
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
      locale,
    },
  };
};


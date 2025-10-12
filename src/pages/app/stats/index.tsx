
import { useTranslations } from "next-intl";

import ArticlesStatsPerCate from "@/features/stats/stats/ArticlesStatsPerCate";
import ViewsStatsPerDay from "@/features/stats/stats/ViewsStatsPerDay";
import Header from "@/components/Header";
import { ReactElement } from "react";
import DashBoradLayout from "@/components/layout/DashBoardLayout";
import { Head } from "@/components/seo";
import { GetServerSideProps } from "next";


export default  function Stats() {
  const t = useTranslations("articles");

  return (
    <>
      <Head
        title={t("title")}
        description="Total information about your articles and number of views for each day"
      />
      <div className="p-4">
        <Header title={t("title")} />
        <section className="flex flex-col md:flex-row gap-2 transition-all mt-2">
          <ArticlesStatsPerCate />
          <ViewsStatsPerDay />
        </section>
      </div>
    </>
  );
}

Stats.getLayout = (page: ReactElement) => {
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


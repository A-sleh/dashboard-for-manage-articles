
import { getTranslations } from "next-intl/server";

import ArticlesStatsPerCate from "@/features/stats/stats/ArticlesStatsPerCate";
import ViewsStatsPerDay from "@/features/stats/stats/ViewsStatsPerDay";
import Header from "@/components/Header";
import { ReactElement } from "react";
import DashBoradLayout from "@/components/layout/DashBoardLayout";
import { Head } from "@/components/seo";


export default async function Stats() {
  const t = await getTranslations("stats");
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

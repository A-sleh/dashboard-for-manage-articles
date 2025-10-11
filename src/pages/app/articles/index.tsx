import { getTranslations } from "next-intl/server";

import { ReactElement } from "react";
import { Head } from "@/components/seo";
import Header from "@/components/Header";
import ArticlesList from "@/features/articles/components/ArticlesList"; 
import DashBoradLayout from "@/components/layout/DashBoardLayout";

export default async function Articles() {
  const t = await getTranslations("articles");
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

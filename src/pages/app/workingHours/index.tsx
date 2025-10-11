

import { ReactElement } from "react";
import { getTranslations } from "next-intl/server";

import { Head } from "@/components/seo";
import Header from "@/components/Header";
import WorkingHoursLayout from "@/features/working-hours/components/WorkingHoursLayout";
import DashBoradLayout from "@/components/layout/DashBoardLayout";

export default async function WorkingHours() {
  const t = await getTranslations("working-hours");

  return (
    <>
      <Head title={t("title")} description="Manage your working hours" />
      <section className="p-4">
        <Header title={t("title")} />
        <WorkingHoursLayout />
      </section>
    </>
  );
}

WorkingHours.getLayout = (page: ReactElement) => {
  return <DashBoradLayout>{page}</DashBoradLayout>;
};

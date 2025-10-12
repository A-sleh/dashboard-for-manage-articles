

import { ReactElement } from "react";
import { useTranslations } from "next-intl";


import { Head } from "@/components/seo";
import Header from "@/components/Header";
import WorkingHoursLayout from "@/features/working-hours/components/WorkingHoursLayout";
import DashBoradLayout from "@/components/layout/DashBoardLayout";
import { GetServerSideProps } from "next";

export default function WorkingHours() {
  const t = useTranslations("working-hours");

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


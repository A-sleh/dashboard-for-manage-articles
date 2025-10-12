

import { ReactElement } from "react";
import { Head } from "@/components/seo";
import { useTranslations } from "next-intl";

import Header from "@/components/Header";
import SubHeader from "@/features/setting/components/SubHeader";

import SystemSettings from "@/features/setting/components/SystemSettings";
import UserAvatar from "@/features/setting/components/UserAvatar";
import UserInfo from "@/features/setting/components/UserInfo";
import DashBoradLayout from "@/components/layout/DashBoardLayout";
import { GetServerSideProps } from "next";

export default  function Settings() {
  const t = useTranslations("articles");

  return (
    <>
      <Head title={t("setting-title")} description="Personal setting page" />
      <section className="p-4">
        <Header title={t("setting-title")} />
        <div className="space-y-3">
          <SubHeader title={t("user-information-title")} withUnderLine={true} />
          <div className="flex flex-col just md:flex-row gap-3  ">
            <UserAvatar />
            <UserInfo />
          </div>
          <SubHeader title={t("system-title")} withUnderLine={true} />
          <SystemSettings />
        </div>
      </section>
    </>
  );
}

Settings.getLayout = (page: ReactElement) => {
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

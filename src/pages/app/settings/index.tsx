

import { ReactElement } from "react";
import { Head } from "@/components/seo";
import { getTranslations } from "next-intl/server";

import Header from "@/components/Header";
import SubHeader from "@/features/setting/components/SubHeader";

import SystemSettings from "@/features/setting/components/SystemSettings";
import UserAvatar from "@/features/setting/components/UserAvatar";
import UserInfo from "@/features/setting/components/UserInfo";
import DashBoradLayout from "@/components/layout/DashBoardLayout";

export default async function Settings() {
  const t = await getTranslations("settings");

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

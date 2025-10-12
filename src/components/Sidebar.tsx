"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Settings,
  BarChart,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "./ui/Button"; 
import NavLink from "./ui/NavLink"; 

import AnimateParentLeftEffect, {
  AnimateChildLeftEffect,
} from "@/lib/Animation/AnimateParentLeftEffect";
import AnimateScale from "@/lib/Animation/AnimateScale";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { successToast } from "./custom/toast"; 
import { cn } from "@/lib/utils";


const navItems = [
  { href: "/app/articles", labelKey: "articles-linke", Icon: FileText },
  { href: "/app/stats", labelKey: "stats-linke", Icon: BarChart },
  { href: "/app/workingHours", labelKey: "working-hours-linke", Icon: Calendar },
  { href: "/app/settings", labelKey: "setting-linke", Icon: Settings },
];

export default function Sidebar() {
  const router = useRouter();
  const t = useTranslations("sidebar");

  const logout = useAuth((state) => state.logout);
  const { openSidebar, toggleSidebarView } = useNavSetting();

  async function handleLogoutClicked() {
    try {
      await logout();
      successToast(t("logout-success-not"));
      router.replace("/auth/login");
    } catch (err) {
      throw new Error(t("logout-error-not"));
    }
  }

  // detect md breakpoint (Tailwind default: 768px)
  const [isMd, setIsMd] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMd(("matches" in e ? e.matches : mq.matches) ?? false);

    // set initial value
    onChange(mq);
    // add listener (support both addEventListener and deprecated addListener)
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  // animate differently depending on screen size:
  // - md+: animate width (72 <-> 240) and keep x = 0
  // - <md: animate slide in/out with x and fixed width when open
  const animateProps = isMd
    ? { width: openSidebar ? 240 : 72, x: 0 }
    : { x: openSidebar ? 0 : "-100%", width: 240 };

  return (
    <>
      {/* Mobile backdrop */}
      {!isMd && openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={toggleSidebarView}
          aria-hidden
        />
      )}

      <motion.aside
        initial={false}
        animate={animateProps}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className={cn(
          // fixed on small screens so it slides over content, relative on md so it participates in layout
          "fixed top-0 left-0 z-40 flex flex-col justify-between h-screen",
          "bg-primary dark:bg-primary-dark text-white shadow-xl",
          "overflow-hidden md:relative"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={28} />
            {openSidebar && (
              <h2 className="text-lg font-semibold whitespace-nowrap">
                {t("title")}
              </h2>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebarView}
            className="text-white md:hidden"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Nav Links */}
        <AnimateParentLeftEffect className="flex flex-col gap-2 flex-1 px-2">
          {navItems.map(({ href, labelKey, Icon },index: number) => (
            <AnimateChildLeftEffect duration={index / 3}>
              <NavLink
                key={href}
                href={href}
                title={t(labelKey)}
                Icon={<Icon size={22} />}
              >
                {t(labelKey)}
              </NavLink>
            </AnimateChildLeftEffect>
          ))}
        </AnimateParentLeftEffect>

        {/* Logout */}
        <AnimateScale className="p-4">
          <Button
            onClick={handleLogoutClicked}
            variant="secondary"
            className={cn(
              "w-full flex items-center gap-3 rounded-xs justify-start bg-white dark:text-black",
              !openSidebar && "justify-center"
            )}
          >
            <LogOut size={22} />
            {openSidebar && <span>{t("logout-btn")}</span>}
          </Button>
        </AnimateScale>
      </motion.aside>
    </>
  );
}

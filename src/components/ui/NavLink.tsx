"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

type NavLinkProps = {
  href: string;
  activeClassName?: string;
  children: React.ReactNode;
  Icon?: React.ReactElement;
  title: string;
  isMdScreen?: boolean;
};

export default function NavLink({
  href,
  activeClassName = "bg-white text-primary dark:bg-white/90 dark:text-black",
  children,
  title,
  isMdScreen,
  Icon,
  ...props
}: NavLinkProps) {
  const { openSidebar , toggleSidebarView } = useNavSetting((state) => state);
  const pathname = usePathname();

  // use startsWith if you want to highlight parent routes too
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      onClick={() => !isMdScreen && toggleSidebarView()}
      title={title}
      href={href}
      className={`px-3 py-2 rounded-md font-normal flex items-center gap-2 transition-all 
        ${isActive ? activeClassName : "text-white hover:bg-white/20"}
      `}
      {...props}
    >
      {Icon}
      <p className={`${openSidebar ? "md:block" : "hidden"}`}>{children}</p>
    </Link>
  );
}

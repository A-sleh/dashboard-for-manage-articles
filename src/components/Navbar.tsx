"use client";

import { IoMdMenu } from "react-icons/io";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";

import LanguageToggleButton from "./ui/LanguageToggleButton"; 
import IconToggleTheme from "./ui/IconToggleTheme"; 
import Link from "next/link";

export default function Navbar() {
  const user = useAuth((state) => state.user);
  const { toggleSidebarView, lang } = useNavSetting((state) => state);

  return (
    <nav className="w-full bg-secondary dark:bg-primary-dark shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarView}
          className="text-white hover:bg-white/10"
        >
          <IoMdMenu size={30} />
        </Button>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <IconToggleTheme />
          <LanguageToggleButton
            className={`bg-transparent text-white font-normal ${
              lang == "ar" ? "border-l" : "border-r"
            }  rounded-none border-white uppercase`}
          />

          <Link href={"/app/settings"}>
            {user?.image ? (
              <Avatar>
                <AvatarImage src={user.image} alt="user-avatar" />
                <AvatarFallback>{user?.userName ?? "U"}</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

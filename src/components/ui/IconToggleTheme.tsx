import { useNavSetting } from "@/stores/Nav-setting-store/Nav-setting-store";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const ICON_SIZE = 25;

export default function IconToggleTheme() {
  const { isDarkMode, toggleTheme } = useNavSetting((state) => state);
  return isDarkMode ? (
    <MdDarkMode
      className="text-white cursor-pointer"
      size={ICON_SIZE}
      onClick={toggleTheme}
    />
  ) : (
    <MdOutlineLightMode
      size={ICON_SIZE}
      onClick={toggleTheme}
      className="text-white cursor-pointer"
    />
  );
}

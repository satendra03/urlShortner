import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="">
      <div className="flex items-center space-x-2">
        <Sun
          className={`h-[1.2rem] w-[1.2rem] ${
            !isDarkMode ? "text-yellow-500" : "text-gray-500"
          }`}
        />
        <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
        <Moon
          className={`h-[1.2rem] w-[1.2rem] ${
            isDarkMode ? "text-yellow-500" : "text-gray-500"
          }`}
        />
      </div>
    </div>
  );
}

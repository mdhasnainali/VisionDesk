"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme } = useTheme();

  return (
    <div>
      <div className="flex  items-center gap-3">
        <div className="flex  items-center gap-2">
          <div
            // onClick={() => setTheme("light")}
            className={`flex cursor-pointer p-2 rounded-md hover:bg-accent  items-center gap-2 ${
              theme === "light" ? "text-yellow-500 " : "text-gray-500 "
            }`}
          >
            <Sun className="w-4 h-4" />
            <span className="text-xs font-medium">Light Mode</span>
          </div>
          <div
            // onClick={() => setTheme("dark")}
            className={`flex cursor-pointer p-2 rounded-md hover:bg-accent items-center gap-2 ${
              theme === "dark" ? "text-blue-400 " : "text-gray-500 "
            }`}
          >
            <Moon className="w-4 h-4" />
            <span className="text-xs font-medium">Dark Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
}

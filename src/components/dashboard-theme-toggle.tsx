"use client";

import * as React from "react";
import { Check, ChevronDown, Monitor, Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const emptySubscribe = () => () => {};

export function DashboardThemeToggle({
  isMobile: isMobileProp,
}: {
  isMobile?: boolean;
} = {}) {
  const { theme, setTheme } = useTheme();
  const isMobileHook = useIsMobile();
  const isMobile = isMobileProp ?? isMobileHook;
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const themeOptions = (
    <>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => setTheme("light")}
      >
        <Sun className="size-4" />
        <span>Light</span>
        {mounted && theme === "light" && <Check className="ml-auto size-4" />}
      </DropdownMenuItem>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => setTheme("dark")}
      >
        <Moon className="size-4" />
        <span>Dark</span>
        {mounted && theme === "dark" && <Check className="ml-auto size-4" />}
      </DropdownMenuItem>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => setTheme("system")}
      >
        <Monitor className="size-4" />
        <span>System</span>
        {mounted && theme === "system" && <Check className="ml-auto size-4" />}
      </DropdownMenuItem>
    </>
  );

  if (isMobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="menuitem"
            className="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none"
          >
            <SunMoon className="size-4" />
            <span>Theme</span>
            <ChevronDown className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="start"
          className="w-(--radix-dropdown-menu-trigger-width)"
        >
          {themeOptions}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="cursor-pointer">
        <SunMoon className="size-4" />
        <span>Theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>{themeOptions}</DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}

export default DashboardThemeToggle;

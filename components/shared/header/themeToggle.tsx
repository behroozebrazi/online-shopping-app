"use client";

import { useSyncExternalStore } from "react";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, SunMoon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const mounted = useIsMounted();

  // Render the same output on the server and during initial hydration.
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled
      >
        <SunMoon />
      </Button>
    );
  }

  const currentTheme =
    theme === "system" ? (
      <SunMoon />
    ) : theme === "dark" ? (
      <MoonIcon />
    ) : (
      <SunIcon />
    );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          }
        >
          {currentTheme}
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={theme === "system"}
              onClick={() => setTheme("system")}
            >
              <SunMoon />
              System
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={theme === "dark"}
              onClick={() => setTheme("dark")}
            >
              <MoonIcon />
              Dark
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={theme === "light"}
              onClick={() => setTheme("light")}
            >
              <SunIcon />
              Light
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ThemeToggle;

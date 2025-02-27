"use client";
import { ThemeProvider } from "@/components/theme-provider";
import NavMenu from "@/components/NavMenu";
import { AudioProvider } from "./AudioProvider";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
    <AudioProvider>
      {children}
      <NavMenu />
    </AudioProvider>
    </ThemeProvider>
  );
}

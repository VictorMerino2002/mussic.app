"use client";
import { ThemeProvider } from "@/components/theme-provider";
import NavMenu from "@/components/NavMenu";
import { AudioPlayer } from "./AudioPlayer";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
    <AudioPlayer>
      {children}
      <NavMenu />
    </AudioPlayer>
    </ThemeProvider>
  );
}

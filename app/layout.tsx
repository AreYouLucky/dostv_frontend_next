import type { Metadata } from "next";
import { montserrat, poppins } from "@/utils/font";
import "./globals.css";
import AppShell from "@/components/ui/app-shell";
import { fetchPrograms} from "@/hooks/fetch-data/programs";
import { fetchTopYTVideos } from "@/hooks/fetch-data/yt";
import React from "react";
import { ProgramsModel } from "@/types/models";
import { fetchAds } from "@/hooks/fetch-data/ads";


export const metadata: Metadata = {
  metadataBase: new URL("https://dostv.ph"), // ← replace with your real domain
  title: "DOSTv",
  description:
    "DOSTV brings science closer to every Filipino. It showcases programs, stories, and innovations from the Department of Science and Technology.",
  openGraph: {
    title: "DOSTv",
    description:
      "DOSTV brings science closer to every Filipino. It showcases programs, stories, and innovations from the Department of Science and Technology.",
    images: [
      {
        url: "/storage/images/logos/dostv.png", // now resolves correctly
        width: 1200,
        height: 630,
        alt: "DOSTV Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DOSTv",
    description:
      "DOSTV brings science closer to every Filipino.",
    images: ["/storage/images/logos/dostv.png"],
  },
  icons: {
    icon: "/storage/images/logos/logo.png",
  },
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const programs: ProgramsModel[] = await fetchPrograms();
  const youTubeVideos = await fetchTopYTVideos();
  const ads = await fetchAds();
  return (
<html lang="en" className={` ${montserrat.variable} ${poppins.variable}`}>
  <body className="h-screen max-w-7xl overflow-hidden bg-[#0f0f0f]">
    <div
      className="relative h-screen w-screen"
      style={{
        backgroundImage: "url('/storage/images/backgrounds/dostv_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="
          relative z-10
          h-screen w-screen
          bg-white/10
          backdrop-blur-xl
          border border-white/10
        "
      >
        <AppShell programs={programs ?? []} youTubeVideos={youTubeVideos} ads={ads ?? []}>
          <main className="flex-1 h-screen overflow-y-auto font-inter scroll-slim font-poppins">
            {children}
          </main>
        </AppShell>
      </div>
    </div>
  </body>
</html>



  );
}

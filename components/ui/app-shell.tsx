"use client";

import { useState, Suspense } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { type ProgramsModel, TopCount, AdvertisementModel } from "@/types/models";
import TopYouTube from "./top-youtube/top-yt-videos-lg";
import TopYouTubeSkeleton from "./top-youtube/top-yt-lg-loader";


export default function AppShell({
  programs,
  youTubeVideos,
  ads,
  children,
}: {
  children: React.ReactNode;
  programs: ProgramsModel[];
  youTubeVideos: TopCount;
  ads: AdvertisementModel[]
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("collapsed") === "true";
  });

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("collapsed", String(next));
      return next;
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        ads={ads}
        open={sidebarOpen}
        collapsed={collapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={toggleCollapse}
        programs={programs}
      />

      <div className="flex flex-1 flex-col relative">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="w-full flex-1 overflow-visible">
          {children}</div>
      </div>

      {/* Right panel */}
      <div className="w-90  py-2 hidden lg:block ">
        <Suspense fallback={<TopYouTubeSkeleton />}>
          <TopYouTube data={youTubeVideos} />
        </Suspense>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { type ProgramsModel,AdvertisementModel, CategoriesModel } from "@/types/models";
import Footer from "./footer";

export default function AppShell({
  programs,
  ads,
  categories,
  children,
}: {
  children: React.ReactNode;
  programs: ProgramsModel[];
  ads: AdvertisementModel[];
  categories: CategoriesModel[];
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
      <div className="shrink-0">
        <Sidebar
          ads={ads}
          open={sidebarOpen}
          collapsed={collapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={toggleCollapse}
          programs={programs}
        />
      </div>

      <div className="flex flex-1 flex-col relative min-w-0 h-screen bg-gray-900/20">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 overflow-y-auto scroll-slim">
          <main className="w-full min-h-screen">
            {children}
          </main>
          <Footer categories={categories} />
        </div>
      </div>
    </div>

  );
}

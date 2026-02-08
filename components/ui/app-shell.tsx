"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem('collapsed') === "true";
    });

    const toggleCollapse = () => {
        setCollapsed((prev) => {
            const next = !prev;
            localStorage.setItem('collapsed', String(next));
            return next;
        });
    };


    return (
        <div className="flex min-h-screen">
            <Sidebar
                open={sidebarOpen}
                collapsed={collapsed}
                onClose={() => setSidebarOpen(false)}
                onToggleCollapse={toggleCollapse}
            />

            <div className="flex flex-1 flex-col">
                <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}

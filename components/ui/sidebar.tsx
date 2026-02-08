"use client";
import {
    Home,
    Video,
    Radio,
    Settings,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PrefetchLink from "./prefetch-link";
import { useState } from "react";

type SidebarProps = {
    open: boolean;
    collapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
};

const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Videos", href: "/videos", icon: Video },
    { label: "Live", href: "/live", icon: Radio },
    { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({
    open,
    collapsed,
    onClose,
    onToggleCollapse,
}: SidebarProps) {

    const [hovered, setHovered] = useState(false);

    const isExpanded = !collapsed || hovered;
    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "fixed z-50 h-full min-h-screen border-r bg-black/80 text-white transition-all duration-300",
                    "md:static md:translate-x-0",
                    open ? "translate-x-0" : "-translate-x-full",
                    isExpanded ? "md:w-64" : "md:w-16"
                )}
            >
                <div className="flex items-center justify-between  px-3 py-7">
                    {isExpanded && <div className="font-semibold">
                        <Image
                            src="/storage/images/logos/dostv.png"
                            alt="DOSTV Logo"
                            width={120} height={100}
                            priority
                        />
                    </div>}

                    <button
                        onClick={onToggleCollapse}
                        className="hidden md:flex p-1 rounded "
                        aria-label="Toggle sidebar"
                    >
                        {!isExpanded ? (
                            <>
                                <div>
                                    <Image
                                        src="/storage/images/logos/logo.png"
                                        alt="DOSTV Logo"
                                        width={20}
                                        height={20}
                                        sizes="20px"
                                        className=" max-w-none w-fit"
                                        priority
                                    />
                                </div>
                                <ChevronRight className="h-4 w-4 " />
                            </>
                        ) : (
                            <>
                                <ChevronLeft className="h-4 w-4" />
                            </>
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 p-2">
                    <PrefetchLink
                        href="/"
                        onHoverStart={() => collapsed && setHovered(true)}
                        onHoverEnd={() => setHovered(false)}
                        className={cn(
                            "flex items-center gap-3 rounded px-2 py-2 text-sm hover:bg-gray-100",
                            collapsed && "justify-start"
                        )}
                    >
                        <Home className="h-5 w-5 shrink-0" />
                        {isExpanded && <span>Home</span>}
                    </PrefetchLink>
                    
                </nav>
            </aside>
        </>
    );
}

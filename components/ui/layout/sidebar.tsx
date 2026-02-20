
import {
    Home,
    Video,
    Newspaper,
    ChevronLeft,
    ChevronRight,
    MicVocal, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PrefetchLink from "../prefetch-link";
import { ProgramsModel, AdvertisementModel } from "@/types/models";
import SidebarCollapseGroup from "../collapseable-links";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import AdsLoader from "../advertisement/ads-loader";
import Ads from "../advertisement/ads";
import Socials from "../socials";
import { Activity } from "react";

type SidebarProps = {
    open: boolean;
    collapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
    programs: ProgramsModel[];
    ads: AdvertisementModel[]
};



export default function Sidebar({
    open,
    collapsed,
    onClose,
    onToggleCollapse,
    programs,
    ads
}: SidebarProps) {

    const path = usePathname();
    const isExpanded = !collapsed;
    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "fixed z-50 font-inter min-h-screen max-h-screen flex flex-col overflow-hidden border-r border-gray-50/10",
                    "lg:bg-gray-900/80 bg-gray-800 text-white transition-all duration-300",
                    "lg:static lg:translate-x-0",
                    open ? "translate-x-0" : "-translate-x-full",
                    isExpanded ? "w-60  lg:w-60" : " lg:w-18"
                )}
            >
                <div className="flex items-center justify-between  px-5 py-4 md:py-6 border-b border-gray-50/10">
                    {isExpanded && <div className="font-semibold">
                        <Image
                            src="/storage/images/logos/dostv.png"
                            alt="DOSTV Logo"
                            width={140}
                            height={120}
                            priority
                            className="h-auto w-32"
                        />


                    </div>}

                    <button
                        onClick={onToggleCollapse}
                        className="hidden md:flex p-1 rounded gap-2 "
                        aria-label="Toggle sidebar"
                    >
                        {!isExpanded ? (
                            <>
                                <div>
                                    <Image
                                        src="/storage/images/logos/logo.png"
                                        alt="DOSTV Logo"
                                        width={25}
                                        height={25}
                                        sizes="20px"
                                        className=" max-w-none w-fit "
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
                <nav className="flex flex-col gap-3 px-4 py-6 flex-1 overflow-y-auto scroll-slim">
                    <PrefetchLink
                        href="/"
                        className={cn(
                            "text-[14px] font-semibold flex items-center gap-3 rounded px-2 py-2 hover:scale-105 duration-300",
                            collapsed && "justify-start", path == '/home' ? " text-white " : "text-gray-200",
                        )}
                    >
                        <Home className={`h-5 w-5 shrink-0 font-bold ${path == '/home' && " text-white"}`} />
                        {isExpanded && <span>Home</span>}
                    </PrefetchLink>
                    <div className="space-y-1">
                        {isExpanded && (
                            <p className="px-1 text-[11px] font-semibold uppercase text-white/40">
                                Programs
                            </p>
                        )}
                        <Activity>
                            <SidebarCollapseGroup label="Videos" icon={<Video className="h-5 w-5 shrink-0" />}
                                items={programs?.filter(program => program.program_type === "Video")} sidebarExpanded={isExpanded}
                            />
                        </Activity>
                        <Activity>
                            <SidebarCollapseGroup label="Blogs" icon={<Newspaper className="h-5 w-5 shrink-0" />}
                                items={programs?.filter(program => program.program_type === "Blogs")} sidebarExpanded={isExpanded}
                            />
                        </Activity>
                    </div>


                    <div className="space-y-1 mt-2">
                        {isExpanded && (
                            <p className="px-1 text-[11px] font-semibold uppercase text-white/40">
                                Info
                            </p>
                        )}
                        <PrefetchLink
                            href="/about"
                            className={cn(
                                "text-[14px] font-semibold flex items-center gap-3 rounded px-2 py-2 hover:scale-105 duration-300",
                                collapsed && "justify-start", path == '/about' ? " text-white" : "text-gray-400"
                            )}
                        >
                            <Info className={`h-5 w-5 shrink-0 font-bold ${path == '/about' && " text-[#00aeef]"}`} />
                            {isExpanded && <span>About</span>}
                        </PrefetchLink>
                        <PrefetchLink
                            href="/testimonials"
                            className={cn(
                                "text-[14px] font-semibold flex items-center gap-3 rounded px-2 py-2 hover:scale-105 duration-300",
                                collapsed && "justify-start", path == '/testimonials' ? " text-white" : "text-gray-400"
                            )}
                        >
                            <MicVocal className={`h-5 w-5 shrink-0 font-bold ${path == '/testimonials' && " text-[#00aeef]"}`} />
                            {isExpanded && <span>Testimonials</span>}
                        </PrefetchLink>

                    </div>

                </nav>
                {isExpanded && (
                    <div className="mt-auto h-60 px-4 lg:px-7 w-full max-w-full overflow-hidden flex justify-center flex-col items-center">
                        <Socials className="pb-4 flex lg:hidden" />
                        <div className="font-bold font-inter mb-4 text-[14px] text-gray-400 uppercase text-center">
                            Advertisements
                        </div>
                        <Suspense fallback={<AdsLoader />}>
                            <Ads ads={ads} />
                        </Suspense>
                    </div>
                )}
            </aside>
        </>
    );
}

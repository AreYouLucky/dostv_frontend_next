"use client";
import Image from "next/image";
import { Menu } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import NavbarLinks from "./navbar-link";
import { usePathname } from "next/navigation";

export default function Navbar({
    onMenuClick,
}: {
    onMenuClick: () => void;
}) {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 h-14 border-b border-white/10 bg-black/60 backdrop-blur">
            <div className="flex h-full items-center justify-between px-4">
                <div className="flex md:hidden">
                    <Image
                        src="/storage/images/logos/dostv.png"
                        alt="DOSTV Logo"
                        width={120} height={100}
                        priority
                    />
                </div>
                {/* Left */}
                <nav className="hidden md:flex items-center gap-6 text-white ">
                    <NavbarLinks url="/home" pathname={pathname}>Home</NavbarLinks>
                    <NavbarLinks url="/about" pathname={pathname}>About</NavbarLinks>
                    <NavbarLinks url="/testimonials" pathname={pathname}>Testimonials</NavbarLinks>
                </nav>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center rounded-full border border-white/20 px-3 py-1.5">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent text-sm text-white outline-none placeholder:text-white/60"
                        />
                        <FaSearch className="ml-2 text-white/70" />
                    </div>

                    <button
                        onClick={onMenuClick}
                        className="md:hidden rounded-md p-2 text-white hover:bg-white/10"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>

            </div>
        </header>
    );
}

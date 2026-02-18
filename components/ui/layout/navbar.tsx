"use client";
import Image from "next/image";
import { Menu } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import Socials from "../socials";


export default function Navbar({
    onMenuClick,
}: {
    onMenuClick: () => void;
}) {

    return (
        <header className="absolute  z-40 h-16 md:h-18 lg:h-20  bg-gray-950/80 md:bg-gray-950/60 lg:bg-gray-950/30 w-full border-b border-white/10">
            <div className="flex h-full items-center justify-between px-6">
                <div className="flex md:hidden">
                    <Image
                        src="/storage/images/logos/dostv.png"
                        alt="DOSTV Logo"
                        width={120} height={100}
                        className="h-auto w-20 md:w-50"
                        priority
                    />
                </div>

                {/* Right */}
                <div className="flex items-center md:gap-3 gap-1 justify-between  md:w-full">
                    <div className="flex items-center rounded-full border border-white/60 md:px-5 px-3 md:py-3 py-2 focus-within:bg-white/90 transition">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent text-sm text-white outline-none  placeholder:text-white/60 focus-within:placeholder:text-black/60 md:w-90 lg:w-100 w-40 focus:text-black"
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
                    <Socials className="hidden md:flex" />

                </div>

            </div>
        </header>
    );
}

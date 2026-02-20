
import Image from "next/image";
import { Menu} from "lucide-react";
import { FaSearch } from "react-icons/fa";
import Socials from "../socials";


export default function Navbar({
    onMenuClick,


}: {
    onMenuClick: () => void;

}) {


    return (
        <header
            className="absolute z-40 h-16 md:h-18 lg:h-20 w-full border-b border-white/10 backdrop-blur-md lg:bg-gray-900/60 bg-gray-900/90"
        >
            <div className="flex h-full items-center justify-between px-6">
                <div className="flex lg:hidden">
                    <Image
                        src="/storage/images/logos/dostv.png"
                        alt="DOSTV Logo"
                        width={120} height={100}
                        className="h-auto w-20 md:w-35"
                        priority
                    />
                </div>

                {/* Right */}
                <div className="flex items-center md:gap-3 gap-1 justify-between lg:w-full">
                    <div
                        className="flex items-center rounded-full border  border-white md:px-5 px-3 md:py-3 py-2 transition text-white focus-within:bg-white focus-within:text-black"
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent text-sm outline-none md:w-90 lg:w-100 w-40 placeholder:text-gray-100 "
                        />
                        <FaSearch
                            className="ml-2"
                        />
                    </div>



                    <Socials className="hidden lg:flex" />
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden rounded-md p-2 transition"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5 text-white" />
                    </button>

                </div>

            </div>
        </header>
    );
}

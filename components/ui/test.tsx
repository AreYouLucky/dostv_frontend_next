"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";

export interface CardType {
    title: string;
    view_count: string;
    description: string;
    image: string;
    href?: string;
    videoId?: string;
}

export interface Breakpoint {
    maxWidth: number;
    activeWidth: number;
    inactiveWidth: number;
    titleActive: string;
    titleInactive: string;
}

export interface ExpandingCardsProps {
    cards: CardType[];
    breakpoints?: Breakpoint[];
    gap?: string;
    height?: string;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    classNames?: {
        container?: string;
        card?: string;
        image?: string;
        overlay?: string;
        title?: string;
        description?: string;
        button?: string;
        buttonIcon?: string;
    };
    transitionDuration?: number;
}

const COMPACT_BREAKPOINTS = [
    {
        maxWidth: 640,
        activeWidth: 120,
        inactiveWidth: 60,
        titleActive: "12px",
        titleInactive: "10px",
    },
    {
        maxWidth: 1024,
        activeWidth: 180,
        inactiveWidth: 140,
        titleActive: "14px",
        titleInactive: "12px",
    },
];

export function ExpandingCards({
    cards,
    breakpoints = COMPACT_BREAKPOINTS,
    gap = "gap-2 md:gap-2",
    height = "h-[300px] md:h-[350px] lg:h-[400px]",
    prevIcon,
    nextIcon,
    classNames,
    transitionDuration = 0.1,
}: ExpandingCardsProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState<number | null>(null);

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    /* ---------- SSR-safe resize ---------- */
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { titleActive, titleInactive } = useMemo(() => {
        if (!windowWidth) {
            return {
                titleActive: "24px",
                titleInactive: "200px",
            };
        }

        const sorted = [...breakpoints].sort(
            (a, b) => a.maxWidth - b.maxWidth
        );

        let settings = {
            titleActive: "24px",
            titleInactive: "200px",
        };

        for (const bp of sorted) {
            if (windowWidth <= bp.maxWidth) {
                settings = bp;
                break;
            }
        }

        return settings;
    }, [windowWidth, breakpoints]);

    const handlePrev = () => setActiveIndex((i) => Math.max(0, i - 1));
    const handleNext = () => setActiveIndex((i) => Math.min(cards.length - 1, i + 1));
    const handleCardClick = (index: number) => setActiveIndex(index);

    useEffect(() => {
        const container = containerRef.current;
        const card = cardRefs.current[activeIndex];

        if (!container || !card) return;

        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        const offset =
            cardRect.left -
            containerRect.left -
            containerRect.width / 2 +
            cardRect.width / 2;

        container.scrollBy({
            left: offset,
            behavior: "smooth",
        });
    }, [activeIndex]);

    return (
        <div className="relative w-full overflow-hidden min-w-0">
            <div
                ref={containerRef}
                className={` flex items-stretch w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${gap} ${height} ${classNames?.container || ""}`}>
                {cards.map((card, index) => (
                    <motion.div
                        key={`${card.title}-${index}`}
                        ref={(el) => {
                            cardRefs.current[index] = el;
                        }}
                        className={`relative rounded-2xl overflow-hidden cursor-pointer border border-[#00aeef]/40 snap-start min-w-0 ${classNames?.card || ""}`}
                        style={{ contain: "layout paint size" }}
                        animate={{
                            flexGrow: activeIndex === index ? 5 : 1,
                            scale: activeIndex === index ? 1 : 0.80,
                        }}
                        transition={{ duration: transitionDuration }}
                        onClick={() => handleCardClick(index)}
                    >
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            sizes="(max-width: 760px) 70vw, 400px"
                            className={`object-cover ${classNames?.image || ""}`}
                            unoptimized
                        />

                        {/* Overlay */}
                        <div
                            className={`absolute inset-0 bg-linear-to-b from-transparent to-black/20 ${classNames?.overlay || ""}`}
                        />

                        {/* Text */}
                        <motion.div
                            animate={{
                                opacity: activeIndex === index ? 1 : 0,
                                y: activeIndex === index ? 0 : 16,
                                pointerEvents: activeIndex === index ? "auto" : "none",
                            }}
                            transition={{ duration: 0.25 }}
                            className={`absolute bottom-0 left-0 right-0 px-1 text-white w-full flex justify-center items-center ${activeIndex !== index ? "hidden" : "block"
                                }`}
                        >
                            <motion.div
                                animate={{
                                    fontSize: activeIndex === index ? titleActive : titleInactive,
                                }}
                                className={`${classNames?.title || ""}`}
                            >
                                <Link
                                    href={`https://www.youtube.com/watch?v=${card.videoId}`}
                                    target="_blank"
                                    className="fade-up bg-black/90 rounded-lg lg:py-3 px-2 lg:px-4 flex flex-col lg:flex-row gap-3 items-start md:mb-2 hover:bg-black transition"
                                >

                                    <div className=" text-center flex flex-col justify-center gap-1 items-center">
                                        <span className="text-white font-extrabold text-sm md:text-5xl rounded-md px-2 py-1 w-fit h-fit">
                                            #{index + 1}
                                        </span>

                                        <span className="text-[7px] md:text-[10px] text-slate-300 rounded-md py-0.5 px-2 bg-[#004a95] inline-block">
                                            {card.view_count}
                                        </span>
                                    </div>

                                    <div className="flex flex-col flex-1 min-w-0">
                                        <h3 className="text-[11px] lg:text-[13px] font-bold text-white leading-snug mb-1 line-clamp-2">
                                            {card.title}
                                        </h3>

                                        <p className="hidden lg:block lg:text-[12px] text-slate-200 text-justify lg:line-clamp-3 line-clamp-2">
                                            {card.description}
                                        </p>

                                    </div>
                                </Link>
                            </motion.div>

                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Arrows */}
            <div className="absolute inset-0 pointer-events-none">
                <button
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-white/50 rounded-full p-2 pointer-events-auto transition ${activeIndex === 0 ? "opacity-0" : "opacity-100"
                        } ${classNames?.button || ""}`}
                >
                    {prevIcon || (
                        <ChevronLeft
                            className={`w-6 h-6 md:w-8 md:h-8 text-gray-50 ${classNames?.buttonIcon || ""}`}
                        />
                    )}
                </button>

                <button
                    onClick={handleNext}
                    disabled={activeIndex === cards.length - 1}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-white/50 rounded-full p-2 pointer-events-auto transition ${activeIndex === cards.length - 1
                        ? "opacity-0"
                        : "opacity-100"
                        } ${classNames?.button || ""}`}
                >
                    {nextIcon || (
                        <ChevronRight
                            className={`w-5 h-5 md:w-6 md:h-6 lg:h-8 lg:w-8 text-gray-50 ${classNames?.buttonIcon || ""}`}
                        />
                    )}
                </button>
            </div>
        </div>
    );
}

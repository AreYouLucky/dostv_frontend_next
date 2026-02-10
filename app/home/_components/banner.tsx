"use client";

import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import BannerLayout from "./banner-layout";
import { BannerModel } from "@/types/models";

export default function Banner({
    banners,
}: {
    banners: BannerModel[];
}) {
    const autoplay = useRef(
        Autoplay({
            delay: 10_000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [autoplay.current]
    );

    useEffect(() => {
        if (!emblaApi) return;

        const handleSlideChange = () => {
            const slides = emblaApi.slideNodes();
            const activeIndex = emblaApi.selectedScrollSnap();

            slides.forEach((slide, index) => {
                const video = slide.querySelector("video") as HTMLVideoElement | null;

                if (!video) return;

                if (index === activeIndex) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        };

        handleSlideChange();
        emblaApi.on("select", handleSlideChange);

        return () => {
            emblaApi.off("select", handleSlideChange);
        };
    }, [emblaApi]);

    return (
        <div ref={emblaRef} className="embla w-full overflow-hidden">
            <div className="embla__container flex w-full h-full">
                {banners.map((banner) => (
                    <div
                        key={banner.banner_id}
                        className="embla__slide relative flex-[0_0_100%] w-full h-full "
                    >
                        <BannerLayout banner={banner} />
                    </div>
                ))}
            </div>
        </div>

    );
}

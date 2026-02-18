"use client";

import {useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { AdvertisementModel } from "@/types/models";

export default function AdsCarousel({
  ads,
}: {
  ads: AdvertisementModel[];
}) {
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [autoplay.current]
  );


  return (
    <div ref={emblaRef} className="embla w-full overflow-hidden">
      <div className="embla__container flex">
        {ads.map((ad) => (
          <div
            key={ad.advertisement_id ?? ad.thumbnail}
            className="embla__slide flex-[0_0_100%] "
          >
            <Link
              href={ad.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex flex-col gap-2">
                <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src={`/storage/images/advertisements/${ad.thumbnail}`}
                    alt={ad.title ?? "Advertisement"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>

                {ad.title && (
                  <div className="text-[11px] md:text-[12px] lg:text-[13px] font-semibold text-gray-200 text-center">
                    {ad.title}
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

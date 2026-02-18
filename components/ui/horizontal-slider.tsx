"use client"

import { useKeenSlider } from "keen-slider/react"
import { useState } from "react"

export default function HorizontalSlider({
  children,
}: {
  children: React.ReactNode
}) {
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    rubberband: false,
    loop: true, // ✅ ENABLE LOOP

    slides: {
      perView: 2,
      spacing: 9,
      origin: "auto",
    },

    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 4,
          spacing: 16,
          origin: "auto",
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 6,
          spacing: 10,
          origin: "auto",
        },
      },
    },

    created() {
      setLoaded(true)
    },
  })

  return (
   <div className="relative w-full z-10">

      {/* LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-black/60 to-transparent" />

      {/* RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-black/60 to-transparent" />

      {/* ✅ ALWAYS VISIBLE NEXT BUTTON (LEFT SIDE) */}
      {loaded && (
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur text-white md:w-12 md:h-12 w-8 h-8 rounded-full hover:bg-black/70 transition"
        >
          ›
        </button>
      )}

      <div ref={sliderRef} className="keen-slider px-4">
        {children}
      </div>
    </div>
  )
}

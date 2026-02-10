import { BannerModel } from '@/types/models'
import { MdPageview, MdPermMedia } from "react-icons/md"
import { FaCircleInfo } from "react-icons/fa6"
import { PiStarFourBold } from "react-icons/pi"
import { BsCollectionPlayFill } from "react-icons/bs"
import Image from 'next/image'
import BackgroundImg from './background-image'
import { trimText } from '@/lib/utils'

function BannerLayout({ banner }: { banner: BannerModel }) {
  return (
    <div className="font-montserrat text-white border border-white/30 rounded-xl overflow-hidden">
      <BackgroundImg
        imageSrc={banner?.bg ? `/storage/images/banners/bgs/${banner.bg}` : ""}
        fallbackSrc={`/storage/images/banners/${banner.media}`}
        className="
          relative overflow-hidden
          aspect-4/5 sm:aspect-16/10 lg:aspect-16/6
        "
      >
        {banner?.type !== 1 && (
          <div className="
            h-full w-full
            bg-linear-to-b from-black/40 to-black
            px-4 py-6 sm:p-8
          ">
            {/* CONTENT GRID */}
            <div className="
              grid h-full gap-6
              grid-cols-1
              md:grid-cols-5
              items-center
            ">
              {/* LEFT CONTENT */}
              <div className="md:col-span-2 flex flex-col gap-4">
                {/* TITLE / ICON */}
                <div>
                  {banner?.icon ? (
                    <Image
                      src={`/storage/images/banners/icons/${banner.icon}`}
                      alt={banner?.title ?? ''}
                      width={240}
                      height={120}
                      className="object-contain w-44 sm:w-56"
                    />
                  ) : (
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                      {banner?.title}
                    </h3>
                  )}
                </div>

                {/* META TAGS */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {banner?.highlight_text && (
                    <span className="
                      flex items-center gap-1
                      px-2 py-1 rounded-lg
                      bg-red-500/60 border border-red-400
                      font-semibold
                    ">
                      <FaCircleInfo />
                      {banner.highlight_text}
                    </span>
                  )}

                  {banner?.type && [3, 4].includes(banner.type) && (
                    <>
                      {banner?.episodes && (
                        <span className="flex items-center gap-1 border-l pl-2">
                          <MdPermMedia />
                          {banner.episodes} Episodes
                        </span>
                      )}
                      <span className="flex items-center gap-1 border-l pl-2">
                        <PiStarFourBold />
                        Featured
                      </span>
                    </>
                  )}
                </div>

                {/* DESCRIPTION */}
                <p className="
                  text-xs sm:text-sm
                  leading-relaxed text-white/90
                  text-justify
                ">
                  {trimText(banner?.description ?? "", 240)}
                </p>

                {/* CTA */}
                <button className="
                  mt-2 w-fit
                  flex items-center gap-2
                  text-sm font-semibold
                  bg-[#00aeef]/90 hover:bg-[#00aeef]
                  px-4 py-2 rounded-md
                  border border-[#00aeef]
                  transition-transform hover:scale-105
                ">
                  {banner?.type && [3, 4].includes(banner.type) ? (
                    <>
                      <BsCollectionPlayFill /> View Episodes
                    </>
                  ) : (
                    <>
                      <MdPageview /> Browse Now
                    </>
                  )}
                </button>
              </div>

              {/* RIGHT MEDIA */}
              <div className="md:col-span-3 flex justify-center">
                {banner?.type && [2, 3].includes(banner.type) ? (
                  <Image
                    src={`/storage/images/banners/${banner.media}`}
                    alt={banner?.title ?? ''}
                    width={700}
                    height={400}
                    className="
                      w-full max-w-xl
                      aspect-video object-cover
                      rounded-lg
                      shadow-md shadow-[#00aeef]
                      transition-transform hover:scale-105
                    "
                  />
                ) : (
                  <video
                    src={`/storage/videos/banners/${banner.media}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="
                      w-full max-w-xl
                      aspect-video object-contain
                      rounded-lg border border-black
                      shadow-md
                      transition-transform hover:scale-105
                    "
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </BackgroundImg>
    </div>
  )
}

export default BannerLayout

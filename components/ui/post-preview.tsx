import Link from "next/link"
import BackgroundImg from "@/app/home/_components/banner/background-image";
import BackgroundVideo from "@/app/home/_components/banner/background-video";
import { convertLongDate } from "@/lib/utils"
import { FaPlay } from "react-icons/fa";

type PostPreviewProps = {
    title: string;
    date_published: string;
    slug: string;
    program: string;
    excerpt: string;
    thumbnail: string;
    trailer?: string | null;
    banner?: string | null;
    guest?: string | null;
}

function PostPreview({
    title = "Balitang RapiDOST: Mga eksperto, pinarangalan sa 74th PhilAAST",
    date_published = "2025-09-23",
    slug = "balitang-rapidost-mga-eksperto-pinarangalan-sa-74th-philaast",
    program = "Balitang RapiDOST",
    excerpt = "ICYMI: Mga eksperting nasa likod ng mahahalagang pag-aaral at inobasyong kapaki-pakinabang sa mga Pilipino...",
    thumbnail = "rapidost_127316.jpg",
    guest,
    trailer,
    banner
}: PostPreviewProps) {

    return (
       <div className="w-full h-full rounded-xl overflow-hidden border border-white">
            <BackgroundImg
                imageSrc={`/storage/images/post_images/thumbnails/${thumbnail}`}
                className="min-h-105 md:min-h-100 lg:min-h-130"
            >
                <div
                    className="
                    w-full h-full text-white
                    min-h-105 md:min-h-100 lg:min-h-130
                    bg-linear-to-l from-slate-950 via-slate-950/90 to-slate-950/70
                    grid grid-cols-1 md:grid-cols-2 items-stretch
                "
                >
                    <div className="order-2 md:order-1 flex items-center h-full">
                        <div className="px-5 py-6  md:px-10 lg:pl-12 lg:pr-0  max-w-xl space-y-3">
                            <p className="text-[11px] border border-white/80 rounded-md w-fit px-3 py-0.5 font-semibold tracking-wide">
                                {convertLongDate(date_published)}
                            </p>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                                {title}
                            </h1>
                            {program && (
                                <div className="text-[11.5px] px-3 py-1 bg-[#004a95] rounded-md w-fit font-semibold tracking-wide">
                                    {program}
                                </div>
                            )}
                            {guest && (
                                <p className="text-xs text-white/90">
                                    with {guest}
                                </p>
                            )}
                            <p className="text-sm text-white/90 poppins-light line-clamp-4 text-justify">
                                {excerpt}
                            </p>
                            <div className="pt-2">
                                <Link
                                    href={`/post/${slug}`}
                                    className="
                                        bg-white text-gray-900
                                        hover:bg-gray-200
                                        transition
                                        rounded-md
                                        px-5 py-2.5
                                        flex items-center gap-2
                                        w-fit
                                        font-bold text-sm
                                        shadow-lg hover:scale-105 duration-300
                                    "
                                >
                                    <FaPlay className="text-xs" />
                                    WATCH NOW
                                </Link>
                            </div>

                        </div>
                    </div>

                    <div className="order-1 md:order-2 p-4 sm:p-6 md:p-8 h-full flex items-center">

                        <div className="w-full rounded-xl overflow-hidden aspect-video shadow-2xl ring-1 ring-white/10 border border-white/20">

                            {trailer ? (
                                <BackgroundVideo videoSrc={`/storage/videos/post_videos/trailers/${trailer}`}>
                                    <div className="w-full h-full bg-radial-gradient from-black to-transparent" />
                                </BackgroundVideo>
                            ) : banner ? (
                                <BackgroundImg imageSrc={`/storage/images/post_images/banners/${banner}`}>
                                    <div className="w-full h-full" />
                                </BackgroundImg>
                            ) : (
                                <BackgroundImg imageSrc={`/storage/images/post_images/thumbnails/${thumbnail}`}>
                                    <div className="w-full h-full bg-radial-gradient from-black to-transparent" />
                                </BackgroundImg>
                            )}

                        </div>
                    </div>

                </div>
            </BackgroundImg>
        </div>
    )
}

export default PostPreview

"use client"
import ImageLoader from '@/components/ui/image-loader'
import { ProgramsModel, TopCount } from '@/types/models'
import { convertShortDate } from '@/lib/utils'
import { useState } from 'react'
import MdYtList from '../youtube/md-yt-list'
import { LayoutGroup } from "framer-motion";
import { MorphingCard } from "@/components/ui/morphing-card";

export default function FetchPosts({ programs, topCount }: { programs: ProgramsModel[], topCount: TopCount }) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    return (
        <>
            {programs?.map((program, index) => (
                <div className='w-full' key={program.program_id}>
                    {index == 2 && <MdYtList data={topCount} />}
                    {program.episodes && program?.episodes?.length > 0 &&
                        <>
                            <section className='py-2 md:px-5 px-2'>
                                <div className='w-full flex flex-row justify-between mb-2 items-center'>
                                    <div className="  lg:text-[16px] md:text-[13px] text-[11px] font-bold tracking-wider px-3 border-l border-white/40 uppercase">
                                        {program.title}
                                    </div>
                                    <div className='font-semibold bg-[#000000] h-fit rounded-lg px-4 py-1 text-[12px] border border-white/40'>
                                        View All
                                    </div>
                                </div>

                                <div className="relative w-full min-w-0 md:px-5 px-2">

                                    <LayoutGroup>
                                        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4'>
                                            {program.episodes?.map((episode) => (
                                                <MorphingCard
                                                    key={episode.post_id}
                                                    id={episode.post_id as number}
                                                    title={episode.title as string}
                                                    excerpt={episode.excerpt as string}
                                                    date_published={convertShortDate(episode.date_published as string)}
                                                    slug={episode.slug as string}
                                                    program={program.title as string}
                                                    thumbnail={episode.thumbnail as string}
                                                    trailer={episode.trailer as string}
                                                    banner={episode.banner as string}
                                                    guest={episode.guest as string}
                                                    isExpanded={expandedId === episode.post_id}
                                                    onExpand={() => setExpandedId(episode.post_id as number)}
                                                    onCollapse={() => setExpandedId(null)}
                                                >

                                                    <div
                                                        className=" group/card relative aspect-12/7 overflow-hidden rounded-md border border-white/10  shadow bg-linear-to-b from-black/80 via-transparent to-transparent  "
                                                    >
                                                        <ImageLoader
                                                            src={`/storage/images/post_images/thumbnails/${episode.thumbnail}`}
                                                            alt={episode?.title ?? "DOSTV"}
                                                            width={250}
                                                            height={150}
                                                            className="object-cover w-full h-full transition-transform duration-700 group-hover/card:scale-110 group-hover/card:rotate-1"
                                                        />

                                                        <div className="absolute inset-0  opacity-0 transition-opacity duration-500  group-hover/card:opacity-100 p-6 flex items-end"
                                                        >
                                                            <div className="flex flex-wrap justify-center items-center gap-1 translate-y-8 transition-transform duration-500 group-hover/card:translate-y-0">
                                                                {episode.categories?.map((cat, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className=" hover:scale-105 duration-300 lg:px-1 px-1 lg:py-1 py-0.5 text-xs lg:text-[11px] md:text-[10px]  rounded-full bg-[#004a95] backdrop-blur-md text-white border border-white/30"
                                                                    >
                                                                        {cat.category_name as string}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2 text-[11px] font-medium">

                                                            <span className="text-white/90 font-bold">
                                                                {convertShortDate(episode.date_published ?? "")}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </MorphingCard>
                                            ))}

                                        </div>
                                    </LayoutGroup>
                                </div>
                            </section>
                            <div className="lg:px-8 md:px-5 px-5 py-8">
                                <div className="border-b border-white/40"></div>
                            </div>
                        </>
                    }

                </div >
            ))
            }
        </>
    )
}

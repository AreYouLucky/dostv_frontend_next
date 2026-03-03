"use client"
import { LayoutGroup } from "framer-motion";
import { MorphingCard } from "@/components/ui/morphing-card";
import { convertShortDate, convertLongDate } from "@/lib/utils";
import { useGetProgramRelatedPost } from "../../hooks.tsx/post";
import { useState } from "react";
import ImageLoader from "@/components/ui/image-loader";
import PostRelatedProgramLoader from "./post-related-program-loader";
import Link from "next/link";

export default function PostRelatedProgram({ code, program_name }: { code: string, program_name: string }) {
    const { data: relatedPosts, isFetching } = useGetProgramRelatedPost(code);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    if (isFetching) return <PostRelatedProgramLoader />
    return (
        <div className={`flex flex-col  rounded-md  w-full  md:px-5 py-4 lg:py-4 `}>
            <div className="flex justify-between">
                <h2 className=" lg:text-[13px] md:text-[13px] text-[11px] font-bold tracking-widest text-white uppercase lg:mb-2">
                    {program_name}
                </h2>
                <Link href={`/program/${code}`} className='font-semibold  h-fit rounded-sm px-4 py-px text-[12px] border border-white/40 text-white'>
                    View All
                </Link>
            </div>
            <LayoutGroup>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {relatedPosts?.map((related) => (
                        <MorphingCard
                            key={related.post_id}
                            id={related.post_id as number}
                            title={related.title as string}
                            excerpt={related.excerpt as string}
                            date_published={convertShortDate(related.date_published as string)}
                            slug={related.slug as string}
                            program={""}
                            thumbnail={related.thumbnail as string}
                            trailer={related.trailer as string}
                            banner={related.banner as string}
                            guest={related.guest as string}
                            isExpanded={expandedId === related.post_id}
                            onExpand={() => setExpandedId(related.post_id as number)}
                            onCollapse={() => setExpandedId(null)}
                        >
                            <div
                                className="flex flex-col gap-3 p-2  text-white hover:scale-105 duration-300"
                            >
                                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10">
                                    <ImageLoader
                                        src={`/storage/images/post_images/thumbnails/${related.thumbnail}`}
                                        alt={related.title || ""}
                                        height={300}
                                        width={300}
                                        className="object-cover"
                                    />
                                    <span className="text-[10px] rounded px-2 py-px  font-semibold text-gray-50 bg-[#00aeef]/80 absolute bottom-2 left-2">
                                        {convertLongDate(related.date_published as string)}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[14px] font-semibold line-clamp-2">
                                        {related.title}
                                    </h4>
                                </div>
                            </div>
                        </MorphingCard>

                    ))}
                </div>
            </LayoutGroup>
        </div>
    )
}

"use client";
import { useState } from 'react';
import { MorphingCard } from '@/components/ui/morphing-card'
import ImageLoader from '@/components/ui/image-loader'
import { convertLongDate, convertShortDate } from '@/lib/utils'
import { LayoutGroup } from 'framer-motion';
import { useGetProgramRecentPosts } from '../hooks/program';
import PostRelatedProgramLoader from '@/app/post/[slug]/_components/post-related-program-loader';

export default function ProgramRecentPosts({className, code}: {className: string, code: string}) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const { data: relatedPosts, isFetching } = useGetProgramRecentPosts(code);
    if(isFetching) return <PostRelatedProgramLoader />
    return (
        <div className={`flex flex-col    w-full  md:px-5 py-2  ${className} border-b border-white/40`}>
            <h2 className=" lg:text-xl md:text-[13px] text-[11px] font-bold tracking-wide text-white uppercase lg:mb-2">
                Recent Post
            </h2>
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
                                    <span className="text-[10px] rounded px-2 py-px font-semibold text-gray-50 bg-[#00aeef]/80 absolute bottom-2 left-2">
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

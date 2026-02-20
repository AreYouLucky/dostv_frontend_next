"use client";
import { useState } from 'react';
import { MorphingCard } from '@/components/ui/morphing-card'
import ImageLoader from '@/components/ui/image-loader'
import { convertLongDate, convertShortDate } from '@/lib/utils'
import { PostModel } from '@/types/models'
import { LayoutGroup } from 'framer-motion';
export default function SimilarPost({ relatedPosts, className }: { relatedPosts: PostModel[], className: string }) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    return (
        <div className={`flex flex-col  rounded-md  w-full  md:px-5 py-4 lg:py-4 ${className}`}>
            <h2 className=" lg:text-[13px] md:text-[13px] text-[11px] font-bold tracking-widest text-white uppercase lg:mb-2">
                You might also like
            </h2>
            <LayoutGroup>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {relatedPosts.slice(1, 7).map((related) => (
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
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[14px] font-semibold line-clamp-2">
                                        {related.title}
                                    </h4>
                                    <span className="text-[10px] rounded px-2 py-px bg-gray-800 font-semibold text-gray-50">
                                        {convertLongDate(related.date_published as string)}
                                    </span>
                                </div>
                            </div>
                        </MorphingCard>

                    ))}
                </div>
            </LayoutGroup>
        </div>
    )
}

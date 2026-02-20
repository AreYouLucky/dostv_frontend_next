"use client"
import React from 'react'
import ImageLoader from '@/components/ui/image-loader'
import { convertShortDate, convertLongDate } from '@/lib/utils'
import { MorphingCard } from '@/components/ui/morphing-card'
import { useState } from 'react'
import { PostModel } from '@/types/models'
export default function UpNext({ post }: { post: PostModel }) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    return (
        <MorphingCard
            id={post.post_id as number}
            title={post.title as string}
            excerpt={post.excerpt as string}
            date_published={convertShortDate(post.date_published as string)}
            slug={post.slug as string}
            program={""}
            thumbnail={post.thumbnail as string}
            trailer={post.trailer as string}
            banner={post.banner as string}
            guest={post.guest as string}
            isExpanded={expandedId === post.post_id}
            onExpand={() => setExpandedId(post.post_id as number)}
            onCollapse={() => setExpandedId(null)}
        >
            <div
                className="flex flex-col gap-3 p-2  text-white"
            >
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10">
                    <ImageLoader
                        src={`/storage/images/post_images/thumbnails/${post.thumbnail}`}
                        alt={post.title || ""}
                        height={300}
                        width={300}
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold line-clamp-3">
                        {post.title}
                    </p>
                    <span className="text-[10px] rounded px-2 py-px bg-gray-800 font-semibold text-gray-50">
                        {convertLongDate(post.date_published as string)}
                    </span>
                </div>
            </div>
        </MorphingCard>
    )
}

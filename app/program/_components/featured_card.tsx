"use client"
import React from 'react'
import ImageLoader from '@/components/ui/image-loader'
import { PostModel } from '@/types/models'
import { RiVideoOnAiFill, RiPlayLargeFill } from "react-icons/ri";
import { convertLongDate } from '@/lib/utils';
import { MorphingCard } from '@/components/ui/morphing-card';


export default function FeaturedCard({ featured }: { featured: PostModel }) {
    const [expandedId, setExpandedId] = React.useState<number | null>(null);
    return (
        <>
            <span className=' w-fit  flex items-center justify-center gap-2 text-white/90 rounded-full  text-base md:text-lg lg:text-2xl  py-1 font-bold'>
                <RiVideoOnAiFill /> Featured Episode
            </span>
            <MorphingCard
                id={featured.post_id as number}
                title={featured.title as string}
                excerpt={featured.excerpt as string}
                date_published={convertLongDate(featured.date_published as string)}
                slug={featured.slug as string}
                program={""}
                thumbnail={featured.thumbnail as string}
                trailer={featured.trailer as string}
                banner={featured.banner as string}
                guest={featured.guest as string}
                isExpanded={expandedId === featured.post_id}
                onExpand={() => setExpandedId(featured.post_id as number)}
                onCollapse={() => setExpandedId(null)}
            >
                <>
                    <div className='rounded-lg border border-white/30 overflow-hidden relative'>
                        <ImageLoader
                            src={`/storage/images/post_images/thumbnails/${featured.thumbnail}`}
                            width={300}
                            height={300}
                            alt={featured.title ?? ""}
                            className="w-full h-full object-cover hover:scale-110  duration-600 transition-transform hover:rotate-1"
                        />
                        <span>
                            <RiPlayLargeFill className='w-30 h-30 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
                        </span>
                    </div>
                    <div>
                        <h1 className='md:text-2xl text-xl font-bold leading-snug text-white my-2'>
                            {featured.title}
                        </h1>
                        <h3 className='text-xs md:text-sm text-[#00aeef] flex items-center gap-2 mt-1 font-semibold w-fit  rounded-lg py-px my-1'>{convertLongDate(featured?.date_published as string)}</h3>
                        <p className='line-clamp-3 text-white/90 text-[14.2px] text-justify'>{featured.excerpt}</p>
                    </div>
                </>

            </MorphingCard>
        </>
    )
}

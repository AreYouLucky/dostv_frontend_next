
import { PostModel } from '@/types/models'
import HorizontalSlider from '@/components/ui/horizontal-slider'
import ImageLoader from '@/components/ui/image-loader'
import { convertShortDate } from '@/lib/utils'
import Link from 'next/link'
export default function RecentPosts({ recentPosts }: { recentPosts: PostModel[] }) {


    return (
        <div className="relative w-full min-w-0">
            <HorizontalSlider>
                {recentPosts.map((post) => (
                    <Link
                        href={`/post/${post.slug}`}
                        key={post.post_id}
                       
                    >
                        <div  className="keen-slider__slide group/card flex flex-col overflow-hidden rounded-lg border border-white/10  shadow-lg">
                        <div className="relative overflow-hidden">
                            <ImageLoader
                                src={`/storage/images/post_images/thumbnails/${post.thumbnail}`}
                                alt={post.title ?? ""}
                                width={300}
                                height={250}
                                className="object-cover w-full aspect-12/7 transition-transform duration-700 group-hover/card:scale-110 group-hover/card:rotate-1"
                            />
                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2 text-[11px] font-medium">
                                <span className="rounded bg-red-500/80 lg:px-2 px-2 py-0.5 font-semibold text-white md:text-xs text-[10px]">
                                    NEW
                                </span>

                                <span className="text-white/90">
                                    {convertShortDate(post.date_published ?? "")}
                                </span>
                            </div>
                        </div>
                        </div>
                    </Link>



                ))}
            </HorizontalSlider>
        </div>
    )
}

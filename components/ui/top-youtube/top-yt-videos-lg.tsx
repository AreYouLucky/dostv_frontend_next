

import Link from "next/link";
import Image from "next/image";
import { Crown, PlayCircle } from "lucide-react";
import { trimText } from "@/lib/utils";
import { TopCount } from "@/types/models";



export default function TopYouTube({ data }: { data: TopCount }) {
  function formatViews(views: number | null) {
    if (!views) return "-";
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
    return `${views.toLocaleString()} views`;
  }

  if (!data?.top_10_most_viewed?.length) {
    return (
      <div className="rounded-2xl shadow-md p-6 text-sm text-gray-300">
        No YouTube data available.
      </div>
    );
  }

  const [topOne, ...rest] = data.top_10_most_viewed;

  return (
    <div className="w-full h-screen p-4 md:p-4  flex flex-col gap-3 bg-black/5 rounded-lg shadow-lg ">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-gray-800 text-gray-100">
          <Crown className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-[15px] font-bold uppercase text-white">
            Top 10 YouTube Videos
          </h3>
          <p className="text-[11px] text-slate-300">
            Ranked by view count
          </p>
        </div>
      </div>

      {/* Top video */}
      <Link
        href={`https://www.youtube.com/watch?v=${topOne.video_id}`}
        target="_blank"
        className="relative flex gap-3 p-3 rounded-2xl bg-gray-950/50 text-white"
      >
        <div className="relative w-28 h-20 rounded-xl overflow-hidden">
          <Image
            src={topOne.thumbnail || ""}
            alt={topOne.title || ""}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <PlayCircle className="w-8 h-8" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-semibold line-clamp-2">
            {topOne.title}
          </h4>
          <p className="mt-1 text-[11px] text-slate-300 line-clamp-2">
            {trimText(topOne.description || "", 90)}
          </p>
          <span className="mt-2 inline-block text-[11px] px-2 py-0.5 rounded-full bg-[#00aeef]/50">
            {formatViews(topOne.view_count)}
          </span>
        </div>
      </Link>

      {/* Remaining */}
      <div className="space-y-2 flex-1 overflow-y-auto overflow-x-hidden pr-1 scroll-slim">
        {rest.slice(0, 9).map((video, index) => (
          <Link
            key={video.video_id ?? index}
            href={`https://www.youtube.com/watch?v=${video.video_id}`}
            target="_blank"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-800 text-white hover:scale-105 duration-300"
          >
            <span className="w-7 h-7 rounded-full bg-gray-800 flex text-gray-100 items-center justify-center text-sm font-extrabold">
              {index + 2}
            </span>

            <div className="relative w-16 h-11 rounded-lg overflow-hidden">
              <Image
                src={video.thumbnail || ""}
                alt={video.title || ""}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium line-clamp-2">
                {trimText(video.title || "", 60)}
              </p>
              <span className="text-[11px] text-slate-300">
                {formatViews(video.view_count)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

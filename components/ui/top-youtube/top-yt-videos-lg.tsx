

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
    <div className="w-full h-screen px-6 py-4 flex flex-col gap-3 bg-black/10 rounded-lg shadow-lg font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-sky-800 text-[#ffffff]">
            <Crown className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[14px]  tracking-wide text-white font-bold uppercase">
              Top 10 YouTube Videos
            </h3>
            <p className="text-[11px] text-slate-300">
              Ranked by view count
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-sky-800 text-[10px] font-medium  text-slate-50 uppercase">
          2026
        </span>
      </div>

      {/* Top video */}
      <Link
        href={`https://www.youtube.com/watch?v=${topOne.video_id}`}
        target="_blank"
        className="relative flex items-center gap-3 p-3 rounded-2xl bg-linear-to-tr from-[#00aeef] to-[#004a95] text-white leading-tight"
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
          <p className="mt-1 text-[11px] text-slate-300 line-clamp-2 leading-tight">
            {trimText(topOne.description || "", 90)}
          </p>
          <span className="mt-2 inline-block text-[10px] px-2 py-0.5 rounded-full bg-yellow-600 text-end">
            {formatViews(topOne.view_count)}
          </span>
        </div>
      </Link>

      {/* Remaining */}
      <div className="space-y-2 flex-1 overflow-y-auto overflow-x-hidden scroll-slim">
        {rest.slice(0, 9).map((video, index) => (
          <Link
            key={video.video_id ?? index}
            href={`https://www.youtube.com/watch?v=${video.video_id}`}
            target="_blank"
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-800 text-white hover:scale-105 duration-300"
          >
            <span className="w-5 h-5 rounded-full bg-blue-400/40 flex text-gray-100 items-center justify-center text-[11px] font-extrabold">
              {index + 2}
            </span>

            <div className="relative w-16 h-11 rounded-lg overflow-hidden  border border-[#ffffff]">
              <Image
                src={video.thumbnail || ""}
                alt={video.title || ""}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium line-clamp-2">
                {trimText(video.title || "", 60)}
              </p>
              <span className="text-[10.5px] text-slate-300">
                {formatViews(video.view_count)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

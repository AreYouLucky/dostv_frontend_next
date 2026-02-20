"use client"
import { CategoriesModel, PostModel, TopCount } from "@/types/models"
import { useState } from 'react'
import { useGetDashboardPosts } from "../_hooks/posts"
import CategoryRadioPills from "@/components/ui/category-radio-pill"
import RecentPosts from "./posts/recent-post"
import FetchPosts from "./posts/fetch-post"
import PostLoader from "./posts/post-loader"
export default function HomeContents({ categories, recentPosts, topCount }: { categories: CategoriesModel[], recentPosts: PostModel[], topCount: TopCount }) {
  const [selected, setSelected] = useState<number[]>([]);
  const { data: programs, isFetching } = useGetDashboardPosts(selected);

  function handleChange(ids: number[]) {
    setSelected(ids);
  }
  return (
    <div className="w-full min-w-0 text-white font-poppins flex flex-col  lg:gap-6 md:gap-4 gap-3 ">
      <div className="flex justify-center w-full md:pt-3 md:pb-5 py-4 bg-black/60 overflow-hidden  z-30">
        <CategoryRadioPills categories={categories} onChange={handleChange} />
      </div>
      <div className="flex flex-col justify-between lg:px-5 md:px-3 px-2">
        <h1 className=" lg:text-[16px] md:text-[13px] text-[11px] font-bold mb-2 tracking-wider px-3 border-l border-white/40">
          RECENTLY ADDED
        </h1>
        <div className="md:px-5 px-2">
          <RecentPosts recentPosts={recentPosts} />
        </div>
      </div>
      <div className="lg:px-10 md:px-5 px-5">
        <div className="border-b border-white/40"></div>
      </div>
      <div className="flex flex-col justify-between ">
        {isFetching ? <PostLoader /> :
          <FetchPosts programs={programs ?? []} topCount={topCount} />
        }
      </div>
    </div>
  )
}

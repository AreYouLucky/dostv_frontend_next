
import HomeContents from "./_components/home-contents";
import { getBannerCategories } from "@/hooks/fetch-data/categories";
import { loadRecentPosts } from "./_hooks/posts";
import { fetchTopYTVideos } from "@/hooks/fetch-data/yt";
export default async function Home() {
  const categories = await getBannerCategories();
  const recentPosts = await loadRecentPosts();
  const topYt = await fetchTopYTVideos();

  return (
    <div className="grid w-full min-w-0 ">
      <div className="w-full overflow-hidden ">
        <HomeContents
          categories={categories ?? []}
          recentPosts={recentPosts ?? []}
          topCount={topYt}/>
      </div>
    </div>

  );
}

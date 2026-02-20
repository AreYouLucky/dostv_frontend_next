import { Metadata } from "next";
import { getPost } from "../hooks.tsx/post";
import VideoInfo from "./_components/video-info";
import { PostModel } from "@/types/models";
import SetBg from "./_components/set-bg";
import SimilarPost from "./_components/similar-post";
import UpNext from "./_components/up-next";
type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const data = await getPost(slug);
  const post = data?.post;

  if (!post) {
    return {
      title: "DOSTv",
      description: "Post not found",
    };
  }

  const image = post.banner
    ? `/storage/images/post_images/banners/${post.banner}`
    : `/storage/images/post_images/thumbnails/${post.thumbnail}`;

  return {
    metadataBase: new URL("https://dostv.ph"),
    title: post.title,
    description: post.excerpt,
    keywords: [
      "DOSTv",
      "DOST Philippines",
      "science Philippines",
      "technology Philippines",
      "innovation",
      "science for the people",
      "DOST programs",
      "Filipino science shows",
      post.title,
      post.tags,
      post.excerpt,
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
    icons: {
      icon: "/storage/images/logos/logo.png",
    },
  };
}



export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getPost(slug);
  const currentPost: PostModel = posts.post
  const relatedPosts: PostModel[] = posts.related

  return (
    <div className="w-full lg:px-10 md:px-5 pt-16 md:pt-18 lg:pt-22">
      <SetBg thumbnail={`/storage/images/post_images/thumbnails/${currentPost.thumbnail}`} />
      <div className="flex  flex-col gap-2">
        <VideoInfo currentPost={currentPost} className="mb-4">
          <div className=" lg:text-[18px] md:text-[13px] text-[11px] font-bold tracking-widest text-white uppercase">
            Up NEXT
          </div>
          {relatedPosts.slice(0, 1).map((related, index) => (
            
            <UpNext post={related} key={index}/>
            
          ))}
        </VideoInfo>
        <SimilarPost relatedPosts={relatedPosts} className="mb-4 px-4 md:px-0" />
      </div>
    </div>
  );
}
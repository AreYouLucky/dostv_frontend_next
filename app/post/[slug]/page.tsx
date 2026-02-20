import { Metadata } from "next";
import { getPost } from "../hooks.tsx/post";
import LinkPlayer from "@/components/ui/link-player";
import { PostModel } from "@/types/models";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {
      title: "DOSTv",
      description: "Post not found",
    };
  }

  const image = post.banner ? `/storage/images/post_images/banners/${post.banner}` : `/storage/images/post_images/thumbnails/${post.thumbnail}`;
  return {
    metadataBase: new URL("https://dostv.ph"),
    title: post.title,
    description: post.excerpt,
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

import Image from "next/image";
import { convertLongDate } from "@/lib/utils";
export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const posts = await getPost(slug);
  const currentPost: PostModel = posts.post
  const relatedPosts: PostModel[] = posts.related
  function popTags(text: string) {
    if (!text) return
    const array = text.split(",");
    return <>{array.map((item, index) => <span key={index} className='text-[13px] rounded px-2 py-1 ml-1  border tracking-wide'>{item}</span>)}</>
  }
  return (
    <div className="w-full lg:px-3 pt-16 md:pt-18 lg:pt-22">
      <div className="flex lg:flex-row flex-col gap-2">
        <div className="w-full">
          <div className="w-full bg-gray-900/30  pb-6 border border-white/10 rounded-md overflow-hidden px-6 py-6">
            <LinkPlayer url={currentPost.url as string} platform={currentPost.platform as string} />
            <div className='w-full relative  text-white mt-4 px-4'>
              <p className="text-3xl font-bold inter-bold relative">{currentPost.title}</p>
              <div className="flex gap-2 items-center">
                <div className="text-[11px] my-2 px-2 py-1 bg-linear-to-br font-semibold from-[#00aeef] to-[#004a95] rounded poppins-semibold w-fit">
                  {currentPost.post_program.title}
                </div>
                <div className="text-[13px] font-semibold ">{convertLongDate(currentPost?.date_published as string)}</div>
              </div>
              {currentPost?.guest && <p className="text-[12px]">with {currentPost?.guest}</p>}

              <div
                className="text-justify poppins-light text-[13px] tracking-wide mt-2 bg-transparent text-white "
                dangerouslySetInnerHTML={{
                  __html: currentPost?.content ?? "",
                }}
              />
              <p className='text-sm poppins-semibold mt-6 mb-2'>{popTags(currentPost?.tags as string)}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-gray-900/10 border border-white/10 rounded-md lg:w-100 w-full  px-5 py-4 lg:py-6 ">
          <div className=" lg:text-[13px] md:text-[13px] text-[11px] font-bold tracking-widest text-white uppercase lg:mb-2">
            You might also like
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3">
            {relatedPosts.map((related, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-2 hover:bg-gray-800 text-white hover:scale-105 duration-300 border-b border-white/10"
              >
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src={`/storage/images/post_images/thumbnails/${related.thumbnail}`}
                    alt={related.title || ""}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold line-clamp-2">
                    {related.title}
                  </p>
                  <span className="text-[10px] rounded px-2 py-px bg-[#00aeef]/20 font-semibold text-gray-50">
                    {convertLongDate(related.date_published as string)}
                  </span>
                </div>
              </div>
            ))}
          </div>


          <div>

          </div>

        </div>
      </div>

    </div>
  );
}
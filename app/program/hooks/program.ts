import { cache } from "react";
import { useQuery } from "@tanstack/react-query";
import { PostModel } from "@/types/models";

export const getProgramInfo = cache(async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/get-program-info/${slug}`,
    {
      headers: {
        "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
      },
      next: { revalidate: 1800 }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
});

export function useGetProgramRecentPosts(code: string) {
  return useQuery<PostModel[]>({
    queryKey: ["program-recent-posts", code],

    queryFn: async (): Promise<PostModel[]> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/program-recent-posts/${code}`,
        {
          headers: {
            Accept: "application/json",
            "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
          },
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch dashboard posts");
      }
      return (await res.json()) as PostModel[];
    },

    staleTime: 1000 * 30,
  });
}

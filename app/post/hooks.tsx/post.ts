import { cache } from "react";
import { useQuery } from "@tanstack/react-query";
import { PostModel } from "@/types/models";

export const getPost = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/get-post/${slug}`,
      {
        headers: {
          "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
          "content-type": "application/json",
        },
             cache: "no-store"
      }
    );

    if (!res.ok) {
      console.error("Get post failed:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Get post fetch error:", error);
    return null;
  }
};

export function useGetProgramRelatedPost(code: string) {
  return useQuery<PostModel[]>({
    queryKey: ["program-related-post", code],

    queryFn: async (): Promise<PostModel[]> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/get-related-post-by-program/${code}`,
        {
          headers: {
            Accept: "application/json",
            "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
            "content-type": "application/json",
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




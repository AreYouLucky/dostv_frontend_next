
import { useQuery } from "@tanstack/react-query";
import { ProgramsModel } from "@/types/models";
import {cache} from "react";


export function useGetDashboardPosts(categories: number[] = []) {
  return useQuery<ProgramsModel[]>({
    queryKey: ["dashboard-posts", categories],

    queryFn: async (): Promise<ProgramsModel[]> => {
      const params = new URLSearchParams();

      categories.forEach((cat) => {
        params.append("categories[]", String(cat));
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/get-dashboard-posts?${params.toString()}`,
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

      return (await res.json()) as ProgramsModel[];
    },

    staleTime: 1000 * 30,
  });
}


export const loadRecentPosts = cache(async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/recent-posts`,
    {
      headers: {
        "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
      },
        next: { revalidate: 1800 }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch programs");
  return res.json();
});




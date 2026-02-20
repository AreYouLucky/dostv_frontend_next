import { cache } from "react";

export const getPost = cache(async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/get-post/${slug}`,
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


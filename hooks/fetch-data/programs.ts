import { cache } from "react";

export const fetchPrograms =  cache(async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/load-programs`,
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


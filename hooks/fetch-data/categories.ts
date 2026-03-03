import { cache } from "react";

export const loadCategories = cache(async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/load-categories`,
      {
        headers: {
          "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
        },
        next: { revalidate: 1800 }, // keep ISR
      }
    );

    if (!res.ok) {
      console.error("Load categories failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Load categories error:", error);
    return [];
  }
});

export const getBannerCategories = cache(async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/get-banner-categories`,
      {
        headers: {
          "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
        },
        next: { revalidate: 1800 }, // keep ISR
      }
    );

    if (!res.ok) {
      console.error("Banner categories failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Banner categories error:", error);
    return [];
  }
});
import { cache } from "react";

export const fetchBanners = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/load-banners`,
      {
        headers: {
          "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
          "content-type": "application/json",
        },
      cache: "no-store"
      }
    );

    if (!res.ok) {
      console.error("Banners API failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Banners fetch error:", error);
    return [];
  }
};
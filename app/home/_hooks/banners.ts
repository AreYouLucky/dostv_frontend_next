

const baseURL =
  typeof window === "undefined"
    ? process.env.BACKEND_INTERNAL_URL
    : process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const fetchBanners = async () => {
  try {
    const res = await fetch(
      `${baseURL}/api/load-banners`,
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
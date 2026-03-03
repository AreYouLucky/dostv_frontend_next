
const baseURL =
  typeof window === "undefined"
    ? process.env.BACKEND_INTERNAL_URL
    : process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetchTopYTVideos = async () => {
  try {
    const res = await fetch(
      `${baseURL}/api/youtube/top-videos/2026`,
      {
        headers: {
          "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
          "content-type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.error("YT API failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("YT fetch error:", error);
    return [];
  }
};
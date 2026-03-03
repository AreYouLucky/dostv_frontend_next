
export const dynamic = "force-dynamic";

export const fetchAds = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/load-advertisements`,
      {
        headers: {
          "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
        },
        cache: "no-store"
      }
    );

    if (!res.ok) {
      console.error("Ads API failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Ads fetch error:", error);
    return [];
  }
};


export const fetchPrograms = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/load-programs`,
      {
        headers: {
          "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "",
          "content-type": "application/json",
        },
              cache: "no-store"
      }
    );

    if (!res.ok) {
      console.error("Programs API failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Programs fetch error:", error);
    return [];
  }
};
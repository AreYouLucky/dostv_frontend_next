export const loadCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/load-categories`,
    {
      headers: {
        "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
};

export const getBannerCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/get-banner-categories`,
    {
      headers: {
        "X-API-TOKEN": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN!,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
};



// _components/banner/index.tsx  (SERVER component)
import { fetchBanners } from "../../_hooks/banners";
import BannerCarousel from "./banner-carousel";

export default async function Banner() {
  const banners = await fetchBanners();

  return (
    <div className="pt-16 md:pt-18 lg:pt-20">
      <BannerCarousel banners={banners} />
    </div>
  );
}

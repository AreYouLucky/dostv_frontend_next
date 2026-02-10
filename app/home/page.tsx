import { fetchBanners } from "./_hooks/banners";
import Banner from "./_components/banner";

export default async function Home() {
  const banners = await fetchBanners();
  return (
    <div className=" flex items-center flex-col mt-18">
      <div className="">
        <Banner banners={banners} />
      </div>
            <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>
      <h3>black</h3>

    </div>
  );
}

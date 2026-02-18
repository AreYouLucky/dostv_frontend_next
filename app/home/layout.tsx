import Splash from "./_components/splash";
import Banner from "./_components/banner/banner";
import BannerLoader from "./_components/banner/banner-loader";


import { Suspense } from "react";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Splash>
      <div className="w-full">
        <Suspense fallback={<BannerLoader />}>
          <Banner />
        </Suspense>
        {children}
      </div>
    </Splash>
  );
}

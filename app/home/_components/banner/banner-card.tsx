import { BannerModel } from '@/types/models'
import BackgroundImg from './background-image';
import BannerCardElements from './banner-card-elements';
import BackgroundVideo from './background-video';

function BannerCard({ banner }: { banner: BannerModel }) {
    return (
        <div className="relative w-full text-white font-montserrat overflow-hidden  leading-relaxed tracking-wide">
            {
                [4, 6, 5].includes(banner?.type) ? (
                    <BackgroundVideo videoSrc={`/storage/videos/banners/${banner?.media}`} className="h-55 md:h-80 lg:h-120 " poster={`/storage/images/banners/bgs/${banner?.bg}`}>
                        {banner?.type !== 5 ? (
                            <>
                                <BannerCardElements banner={banner} />
                            </>
                        ) : <div className=' h-55 md:h-80 lg:h-120'></div>}
                    </BackgroundVideo>
                ) : (
                    <BackgroundImg
                        imageSrc={
                            banner?.bg ? `/storage/images/banners/bgs/${banner?.bg}` : `/storage/images/banners/${banner?.media}`}
                        fallbackSrc={`/storage/images/banners/${banner?.media}`}
                        className="h-55 md:h-80 lg:h-120 ">
                        {banner?.type !== 1 ? (
                            <>
                                <BannerCardElements banner={banner} />
                            </>
                        ) : <div className=' h-55 md:h-80 lg:h-120'></div>}
                    </BackgroundImg>
                )
            }

        </div>
    );
}


export default BannerCard
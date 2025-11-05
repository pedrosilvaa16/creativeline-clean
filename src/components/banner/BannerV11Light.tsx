"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import BannerV11Modal from './BannerV11Modal';
import BannerV11Data from "@/assets/jsonData/banner/BannerV11Data.json"
import SingleBannerV11Light from './SingleBannerV11Light';

const BannerV11Light = () => {
    return (
        <>
            <div className="banner-style-eleven-area overflow-hidden">
                <Swiper
                    className="full-screen-portfolio-slider"
                    direction={'vertical'}
                    loop={true}
                    grabCursor={true}
                    mousewheel={true}
                    navigation={{
                        nextEl: '.full-screen-slider-next',
                        prevEl: '.full-screen-slider-prev',
                    }}
                    pagination={{
                        el: '.full-screen-slider-pagination',
                        type: 'fraction',
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation, Keyboard, Mousewheel, Autoplay]}
                >
                    {BannerV11Data.map(banner =>
                        <SwiperSlide key={banner.id}>
                            <SingleBannerV11Light banner={banner} />
                        </SwiperSlide>
                    )}

                    <div className="full-screen-slider-nav">
                        <div className="full-screen-slider-pagination" />
                        <div className="full-screen-slider-prev"><i className="fas fa-angle-left" /> Prev </div>
                        <div className="full-screen-slider-next">Next <i className="fas fa-angle-right" /></div>
                    </div>
                </Swiper>
            </div>

            <BannerV11Modal />
        </>
    );
};

export default BannerV11Light;
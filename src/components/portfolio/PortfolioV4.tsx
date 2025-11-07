"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, FreeMode } from 'swiper/modules';
import PortfolioV4Data from '@/assets/jsonData/portfolio/PortfolioV4Data.json';
import SinglePortfolioV4 from './SinglePortfolioV4';

interface DataType {
    sectionClass?: string;
    hasTitle?: boolean;
}

const PortfolioV4 = ({ sectionClass, hasTitle }: DataType) => {
    return (
        <>
            <div className={`portfolio-style-four-area default-padding-bottom ${sectionClass ? sectionClass : ""}`}>

                {/* Portfolio Title */}
                {hasTitle &&
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="site-heading">
                                    <h4 className="sub-title">Popular Projects</h4>
                                    <h2 className="title split-text">Featured Works</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container-full no-gap">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-style-four-items">

                                {/* Navigation */}
                                <div className="project-four-nav">
                                    <div className="nav-items">
                                        <div className="project-center-button-prev" />
                                        <div className="project-center-button-next" />
                                    </div>
                                </div>
                                <Swiper className="project-center-stage-carousel swiper"
                                    loop={true}
                                    freeMode={true}
                                    grabCursor={true}
                                    slidesPerView={1}
                                    centeredSlides={true}
                                    spaceBetween={30}
                                    autoplay={false}
                                    navigation={{
                                        nextEl: ".project-center-button-next",
                                        prevEl: ".project-center-button-prev",
                                    }}
                                    breakpoints={{
                                        991: {
                                            slidesPerView: 2,
                                            spaceBetween: 30,
                                            centeredSlides: false
                                        },
                                        1200: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 60
                                        },
                                        1800: {
                                            slidesPerView: 2.8,
                                            spaceBetween: 80
                                        },
                                    }}
                                    modules={[Navigation, FreeMode, Keyboard]}
                                >
                                    {PortfolioV4Data.map(portfolio =>
                                        <SwiperSlide key={portfolio.id}>
                                            <SinglePortfolioV4 portfolio={portfolio} />
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioV4;
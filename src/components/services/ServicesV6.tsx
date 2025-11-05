"use client"
import ServicesV6Data from '@/assets/jsonData/services/ServicesV6Data.json';
import SingleServiceV6 from './SingleServiceV6';
import arrowLongRight from "@/assets/img/icon/arrow-long-right.png"
import Image from 'next/image';
import SplitAnimation from '../animation/SplitAnimation';
import Link from 'next/link';
import useItemMoveTopEffect from '@/hooks/useItemMoveTopEffect';

const ServicesV6 = () => {

    const containerRef = useItemMoveTopEffect();

    return (
        <>
            <div className="services-style-six-area default-padding blurry-shape-left">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5">
                            <div className="service-style-six-info">
                                <h4 className="sub-title">Services We Offer</h4>
                                <SplitAnimation>
                                    <h2 className="title split-text">Turn Information Into Actionable Insights</h2>
                                </SplitAnimation>
                                <Link href="/services" className="btn-circle mt-20">
                                    <div className="button-content">
                                        <span><Image src={arrowLongRight} alt="Image Not Found" /></span> <strong>All Services</strong>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="col-xl-6 offset-xl-1 col-lg-7">
                            <div className="service-style-six-items item-move-top-items" ref={containerRef}>
                                <ul>
                                    {ServicesV6Data.map(service =>
                                        <SingleServiceV6 service={service} key={service.id} />
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesV6;
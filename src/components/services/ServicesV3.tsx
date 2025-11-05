"use client"
import arrowLongRight from '@/assets/img/icon/arrow-long-right.png';
import Image from 'next/image';
import ServicesV3Data from "@/assets/jsonData/services/ServicesV3Data.json"
import SingleServiceV3 from './SingleServiceV3';
import Link from 'next/link';
import SplitAnimation from '../animation/SplitAnimation';
import useActiveIndex from '@/hooks/useActiveIndex';

interface DataType {
    sectionClass?: string;
    hasTitle?: boolean;
}

const ServicesV3 = ({ sectionClass, hasTitle }: DataType) => {
    const { activeIndex, handleMouseEnter, handleTouchStart } = useActiveIndex()

    return (
        <>
            <div className={`services-style-three-area ${sectionClass ? sectionClass : ""}`}>

                {/* Section Title */}
                {hasTitle &&
                    <div className="container">
                        <div className="site-heading">
                            <div className="row align-center">
                                <div className="col-lg-8">
                                    <h4 className="sub-title">Services We Offer</h4>
                                    <SplitAnimation>
                                        <h2 className="title">Turn Information</h2>
                                        <h2 className="title">Into Actionable Insights </h2>
                                    </SplitAnimation>
                                </div>
                                <div className="col-lg-4 text-end">
                                    <Link href="/services" className="btn-circle">
                                        <div className="button-content">
                                            <span><Image src={arrowLongRight} alt="Image Not Found" /></span> <strong>All Members</strong>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="service-style-three-items" id="accordion">
                                {ServicesV3Data.map((service, index) =>
                                    <li
                                        className={activeIndex === index ? 'out' : ''}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onClick={() => handleTouchStart(index)}
                                        onTouchStart={() => handleTouchStart(index)}
                                        key={service.id}
                                    >
                                        <SingleServiceV3 service={service} />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesV3;
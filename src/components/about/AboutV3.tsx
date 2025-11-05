"use client"
import thumb11 from '@/assets/img/thumb/11.jpg';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import useUpDownScroll from '@/hooks/useUpDownScroll';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

interface DataType {
    sectionClass?: string
}

const AboutV3 = ({ sectionClass }: DataType) => {
    const containerRef = useScrollAnimation();

    const shapeRef = useRef<HTMLDivElement>(null!);
    useUpDownScroll(shapeRef);

    return (
        <>
            <div className={`about-style-three-area default-padding-bottom ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-5">
                            <div className="thumb-style-three">
                                <Image src={thumb11} alt="Image Not Found" />
                                <div className="upDownScrol scroll-shape" ref={containerRef} />
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <div className="about-style-three-info text-scroll-animation" >
                                <h2 className="title text">Boost the growth development agency your branding!</h2>
                                <div className="d-flex mt-40">
                                    <div className="left">
                                        <h4 className="sub-title-border"><strong>About Us</strong></h4>
                                    </div>
                                    <div className="right">
                                        <p className="text">
                                            Regular as hearts by garret. Perceived determine departure explained no forfeited he something an. Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff. To perpetual do existence northward as difficult.
                                        </p>
                                        <Link className="btn-animation mt-10" href="/about-us"><i className="fas fa-arrow-right" /> <span>Know More</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV3;
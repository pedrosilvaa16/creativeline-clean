"use client"
import thumb4 from '@/assets/img/thumb/4.jpg';
import thumb13 from '@/assets/img/thumb/13.jpg';
import Image from 'next/image';
import Counter from '../counter/Counter';
import { useEffect, useRef } from 'react';

const BannerV10 = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure video plays after hydration
        if (videoRef.current) {
            videoRef.current.play().catch(err => {
                console.log('Video autoplay failed:', err);
            });
        }
    }, []);

    return (
        <>
            <div className="banner-style-ten-area shadow dark-hard">

                {/* Background Video */}
                <video
                    ref={videoRef}
                    loop
                    muted
                    playsInline
                    suppressHydrationWarning
                >
                    <source src="/assets/video/abstract.mp4" type="video/mp4" />
                </video>

                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/7.jpg)' }} />

                <div className="container">
                    <div className="row align-center">
                        <div className="col-xl-8 col-lg-7 pl-60 pl-md-15 pl-xs-15 order-lg-last">
                            <div className="banner-ten-content">
                                <h2>Transforming ideas into <strong>Digital</strong> <b>realities</b></h2>
                                <p>
                                    Providing innovative solutions in branding, marketing, design, and advertising. These agencies often collaborate with clients to develop unique campaigns, visual identities, and digital strategies that resonate with target audiences. Services may include graphic design, content creation, social media management.
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5">
                            <div className="banner-style-ten-left-info">
                                <Image className="regular-img" src={thumb4} alt="Image Not Found" />
                                <Image className="light-img" src={thumb13} alt="Image Not Found" />
                                <div className="fun-fact-style-two">
                                    <div className="counter">
                                        <div className="timer"><Counter end={28} /></div>
                                        <div className="operator">K</div>
                                    </div>
                                    <span className="medium">Completed Projects</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerV10;
import illustration5 from '@/assets/img/illustration/5.png';
import illustration8 from '@/assets/img/illustration/8.png';
import Image from 'next/image';
import Link from 'next/link';
import SplitAnimationV3 from '../animation/SplitAnimationV3';
import SplitAnimationV4 from '../animation/SplitAnimationV4';

const BannerV1 = () => {
    return (
        <>
            <div className="banner-style-one-area bg-cover"
                style={{ backgroundImage: `url("/assets/img/shape/3.jpg")` }}>
                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/8.jpg)' }} />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="banner-style-one-heading">
                                <div className="banner-title">
                                    <SplitAnimationV3>
                                        Creating
                                    </SplitAnimationV3>
                                    <SplitAnimationV4>
                                        Growth
                                    </SplitAnimationV4>
                                </div>
                                <div className="thumb wow fadeInRight">
                                    <Image className='regular-img' src={illustration5} alt="Image Not Found" />
                                    <Image className='light-img' src={illustration8} alt="Image Not Found" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 offset-xl-1">
                            <div className="banner-style-one-info wow fadeInUp" data-wow-delay="1s" data-wow-duration="0.6s">
                                <div className="top-info">
                                    <h4>Tailored solutions.</h4>
                                    <p>
                                        Limitless possibilities.
                                    </p>
                                </div>
                                <div className="bottom">
                                    <p>
                                        We build brands, websites, and digital experiences that perform. Based in Portugal. Working globally.
                                    </p>
                                    <Link href="/project" className="btn-style-two mt-30"><i className="fas fa-long-arrow-right" /> Our <br /> Projects</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerV1;
import illustration1 from '@/assets/img/illustration/1.png';
import Image from 'next/image';
import Link from 'next/link';
import SplitAnimation from '../animation/SplitAnimation';
import Counter from '../counter/Counter';

const BannerV8 = () => {
    return (
        <>
            <div className="banner-style-eight-area bg-cover"
                style={{ backgroundImage: 'url(/assets/img/shape/3.jpg)' }}>
                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/4.jpg)' }} />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="banner-style-eight-heading">
                                <div className="banner-title">
                                    <SplitAnimation>
                                        <h2 className="title-left split-text">Designing</h2>
                                    </SplitAnimation>
                                    <SplitAnimation>
                                        <h2 className="title-right split-text">Creative</h2>
                                    </SplitAnimation>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="thumb">
                                <Image src={illustration1} alt="Image Not Found" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="d-grid">
                                <h4>Dexus Agency</h4>
                                <div className="right">
                                    <p>
                                        Providing innovative solutions in branding, marketing, design, and advertising. These agencies often collaborate with clients to develop unique campaigns, visual identities, and digital strategies that resonate with target audiences. Services may include graphic design, content creation, social media management.
                                    </p>
                                    <Link className="btn-animation mt-10" href="/about-us"><i className="fas fa-arrow-right" /> <span>Know More</span></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 offset-xl-1">
                            <div className="card-style-one">
                                <div className="bottom">
                                    <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer"><Counter end={31} /></div>
                                            <div className="operator">K</div>
                                        </div>
                                        <span className="medium">Completed Projects</span>
                                    </div>
                                    <Link href="/project"><i className="fas fa-long-arrow-right" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerV8;
import thumb8 from '@/assets/img/thumb/8.jpg';
import thumb9 from '@/assets/img/thumb/9.jpg';
import thumb14 from '@/assets/img/thumb/14.jpg';
import Image from 'next/image';
import Link from 'next/link';
import SplitAnimation from '../animation/SplitAnimation';
import Counter from '../counter/Counter';

const BannerV7 = () => {
    return (
        <>
            <div className="banner-style-seven-area bg-cover"
                style={{ backgroundImage: `url(/assets/img/shape/1.jpg)` }}>
                <div className="light-banner-active bg-light bg-cover" />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2">
                            <div className="banner-seven-info">
                                <SplitAnimation>
                                    <h2 className="split-text">Unique Digital</h2>
                                </SplitAnimation>
                                <SplitAnimation>
                                    <h2 className="split-text text-end">Experience</h2>
                                </SplitAnimation>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banner-seven-bottom-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-5">
                                <div className="banner-seven-thumb">
                                    <Image src={thumb8} alt="Image Not Found" />
                                    <Image className='regular-img' src={thumb9} alt="Image Not Found" />
                                    <Image className="light-img" src={thumb14} alt="Image Not Found" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-7">
                                <div className="content">
                                    <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer"><Counter end={38} /></div>
                                            <div className="operator">K</div>
                                        </div>
                                        <span className="medium">Completed Projects</span>
                                    </div>
                                    <div className="info-right">
                                        <SplitAnimation>
                                            <p className="split-text">
                                                Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic.
                                            </p>
                                        </SplitAnimation>
                                        <Link className="btn-animation mt-30" href="/services"><i className="fas fa-arrow-right" /> <span>Our Services</span></Link>
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

export default BannerV7;
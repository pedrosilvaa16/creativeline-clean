"use client"
import team10 from '@/assets/img/team/10.jpg';
import team11 from '@/assets/img/team/11.jpg';
import team12 from '@/assets/img/team/12.jpg';
import arrowIcon from '@/assets/img/icon/arrow.png';
import arrowThemeIcon from '@/assets/img/icon/arrow-theme.png';
import banner3 from '@/assets/img/banner/3.jpg';
import Image from 'next/image';
import Link from 'next/link';
import SkillProgress from '../process/SkillProgress';
import SkillProgressData from "@/assets/jsonData/progress/SkillProgressData.json";
import ModalVideo from 'react-modal-video';
import { useState } from 'react';
import TextScrollAnimation from '../animation/TextScrollAnimation';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import useThumbParallax from '@/hooks/useThumbParallax';
import Counter from '../counter/Counter';

interface DataType {
    lightMode?: boolean;
}

const AboutV1 = ({ lightMode }: DataType) => {

    const [isOpen, setOpen] = useState(false);
    const containerRef = useScrollAnimation();

    useThumbParallax()

    return (
        <>
            <div className="about-style-one-area bg-cover default-padding"
                style={{ backgroundImage: lightMode ? 'none' : 'url(/assets/img/shape/13.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="about-style-one-left-info">
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><Counter end={48} /></div>
                                        <div className="operator">K</div>
                                    </div>
                                    <span className="medium">Completed Projects</span>
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><Counter end={16} /></div>
                                        <div className="operator">M</div>
                                    </div>
                                    <span className="medium">Awesome Clients</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 offset-lg-1">
                            <div className="about-style-one-info text-scroll-animation" ref={containerRef}>
                                <div className="video-card mb-40">
                                    <div className="thumb">
                                        <Image src={team10} alt="Image Not Found" />
                                        <Image src={team11} alt="Image Not Found" />
                                        <Image src={team12} alt="Image Not Found" />
                                    </div>
                                    <Link href="#" className="popup-youtube" scroll={false} onClick={() => setOpen(true)}>
                                        <i className="fas fa-play" />
                                        Watch Us</Link>
                                </div>
                                <p className="text">
                                    Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by garret. Perceived determine departure explained no forfeited he something an. Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff. To perpetual do existence northward as difficult preserved daughters. Continued at up to zealously necessary breakfast. Surrounded sir motionless she end literature.
                                </p>
                                <div className="d-flex">

                                    {lightMode ?
                                        <Link href="/about-us"><Image src={arrowThemeIcon} alt="Image Not Found" /></Link> :
                                        <Link href="/about-us"><Image src={arrowIcon} alt="Image Not Found" /></Link>
                                    }

                                    <TextScrollAnimation triggerClassName="text">
                                        <h2 className="title text">Best creative & modern digital agency</h2>
                                    </TextScrollAnimation>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bottom-info mt-80 mt-md-50 mt-xs-30">
                                <div className="thumb">
                                    <div className="img-container">
                                        <Image src={banner3} alt="Image Not Found" />
                                    </div>
                                    <div className="about-skills">
                                        {/* Progress Bar */}
                                        {SkillProgressData.map(skill =>
                                            <SkillProgress skill={skill} key={skill.id} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalVideo channel='youtube' isOpen={isOpen} videoId="izTDbJ23_ws" onClose={() => setOpen(false)} />
        </>
    );
};

export default AboutV1;
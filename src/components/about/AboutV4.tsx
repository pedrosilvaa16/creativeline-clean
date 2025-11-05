"use client"
import about1 from "@/assets/img/about/1.jpg"
import about4 from "@/assets/img/about/4.jpg"
import Image from "next/image";
import SkillProgressData from "@/assets/jsonData/progress/SkillProgressData.json"
import SkillProgress from "../process/SkillProgress";
import SplitAnimation from "../animation/SplitAnimation";
import useUpDownScrollV2 from "@/hooks/useUpDownScrollV2";

interface DataType {
    sectionClass?: string
}

const AboutV4 = ({ sectionClass }: DataType) => {

    useUpDownScrollV2(".upDownScrolSlow");

    return (
        <>
            <div className={`about-style-four-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-5">
                            <div className="about-style-four-thumb">
                                <Image src={about1} alt="Image Not Found" />
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <div className="about-style-four-info">
                                <div className="content">
                                    <SplitAnimation>
                                        <p className="split-text">
                                            Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by garret. Perceived determine departure explained no forfeited he something an. Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff.
                                        </p>
                                    </SplitAnimation>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="progress-style-two">
                                        {SkillProgressData.map(skill =>
                                            <SkillProgress skill={skill} key={skill.id} />
                                        )}
                                    </div>
                                    <div className="thumb upDownScrolSlow">
                                        <Image src={about4} alt="Image Not Found" />
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

export default AboutV4;
import arrowLongRight from '@/assets/img/icon/arrow-long-right.png';
import Image from 'next/image';
import Link from 'next/link';
import TeamV3Data from "@/assets/jsonData/team/TeamV3Data.json"
import SingleTeamV3 from './SingleTeamV3';
import SplitAnimation from '../animation/SplitAnimation';

interface DataType {
    hasTitle?: boolean;
    sectionClass?: string;
}

const TeamV3 = ({ hasTitle, sectionClass }: DataType) => {
    return (
        <>
            <div className={`team-style-three-area default-padding bottom-less ${sectionClass ? sectionClass : ""}`}>

                {/* Team Title  */}
                {hasTitle &&
                    <div className="container">
                        <div className="site-heading">
                            <div className="row align-center">
                                <div className="col-lg-6">
                                    <h4 className="sub-title">Team member</h4>
                                    <SplitAnimation>
                                        <h2 className="title split-text">Meet our experts</h2>
                                    </SplitAnimation>
                                </div>
                                <div className="col-lg-6 text-end">
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

                <div className="container-full">
                    <div className="row">
                        {TeamV3Data.slice(0, 4).map(team =>
                            <div className="col-xl-3 col-md-6 mb-30" key={team.id}>
                                <SingleTeamV3 team={team} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamV3;
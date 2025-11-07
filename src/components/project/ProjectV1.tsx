import SplitAnimation from "../animation/SplitAnimation";
import PortfolioV1 from "../portfolio/PortfolioV1";

const ProjectV1 = () => {
    return (
        <>
            <div className="project-style-one-area default-padding blurry-shape-left overflow-hidden">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-4 pr-50 pr-md-15 pr-xs-15">
                            <div className="portfolio-style-one-left-info">
                                <h4 className="sub-title">Recent Work</h4>
                                <SplitAnimation>
                                    <p className="split-text">
                                        We partner with ambitious brands to design and develop high-performing digital solutions. From concept to launch, every detail is driven by innovation, functionality, and measurable results.
                                    </p>
                                </SplitAnimation>
                                <div className="portfolio-info-card">
                                    <h5>Blending creative digital storytelling.</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <PortfolioV1 />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectV1;
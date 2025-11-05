import SplitAnimation from "../animation/SplitAnimation";
import ProcessV1 from "./ProcessV1";

const ProcessWrapper = () => {
    return (
        <>
            <div className="process-area overflow-hidden text-center default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Our Process </h4>
                                <SplitAnimation>
                                    <h2 className="title split-text">Best Solutions Provider</h2>
                                </SplitAnimation>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <ProcessV1 />
                </div>
            </div>
        </>
    );
};

export default ProcessWrapper;
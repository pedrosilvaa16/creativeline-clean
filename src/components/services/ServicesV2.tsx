import ServicesV2Data from "@/assets/jsonData/services/ServicesV2Data.json"
import SplitAnimation from "../animation/SplitAnimation";
import SingleServiceV2 from "./SingleServiceV2";

interface DataType {
    sectionClass?: string;
    hasTitle?: boolean;
}

const ServicesV2 = ({ sectionClass, hasTitle }: DataType) => {
    return (
        <>
            <div className={`services-style-two-area overflow-hidden ${sectionClass ? sectionClass : ""}`}>

                {/* Section Title */}
                {hasTitle &&
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="site-heading text-center">
                                    <h4 className="sub-title">Services We Offer</h4>
                                    <SplitAnimation>
                                        <h2 className="title">Turn Information</h2>
                                        <h2 className="title">Into Actionable Insights </h2>
                                    </SplitAnimation>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="service-hover-items">
                                <ul>
                                    {ServicesV2Data.map(service =>
                                        <SingleServiceV2 service={service} key={service.id} />
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesV2;
"use client"
import ServicesV1Data from "@/assets/jsonData/services/ServicesV1Data.json"
import SplitAnimation from "../animation/SplitAnimation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DataType {
    hasTitle?: boolean;
    sectionClass?: string;
}

const ServicesV1 = ({ hasTitle, sectionClass }: DataType) => {

    const [activeServiceId, setActiveServiceId] = useState(ServicesV1Data[0]?.id || null);

    const handleMouseEnter = (id: number) => {
        setActiveServiceId(id);
    };

    const handleMouseLeave = () => {
        // Do nothing on mouse leave to keep the active item
    };

    return (
        <>
            <div className={`services-style-one-area ${sectionClass ? sectionClass : ""}`}>

                {hasTitle &&
                    <div className="service-style-one-heading">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 text-center">
                                    <div className="site-heading">
                                        <h4 className="sub-title">Services we offer</h4>
                                        <SplitAnimation>
                                            <h2 className="title split-text">Turn Information Into Actionable Insights</h2>
                                        </SplitAnimation>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="services-style-one-items">
                        <div className="row">
                            {ServicesV1Data.slice(0, 4).map((service) => (
                                <div
                                    className="col-xl-3 col-lg-6 col-md-6 single-item"
                                    key={service.id}
                                    onMouseEnter={() => handleMouseEnter(service.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className={`services-style-one-item ${activeServiceId === service.id ? 'active' : ''}`}>
                                        <div className="icon">

                                            <Image className="regular-img" src={`/assets/img/icon/${service.icon}`} alt="Image Not Found" width={75} height={60} />
                                            <Image className="light-img" src={`/assets/img/icon/${service.iconLight}`} alt="Image Not Found" width={75} height={60} />

                                        </div>
                                        <h4>
                                            <Link href={`/service-details/${service.id}`}>{service.title}</Link>
                                        </h4>
                                        <p>{service.text}</p>
                                        <Link className="btn-full" href={`/service-details/${service.id}`}>
                                            Read More <i className="fas fa-arrow-right" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesV1;
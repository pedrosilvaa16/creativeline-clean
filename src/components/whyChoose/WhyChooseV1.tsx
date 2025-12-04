import Image from 'next/image';

interface DataType {
    sectionClass?: string
}

const WhyChooseV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-5">
                            <div className="thumb-style-one">
                                <Image 
                                src="/assets/img/about/creative-line-support-woman.webp" 
                                width={641}
                                height={769}
                                alt="Creative Line Woman Client Support" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="choose-us-style-one">
                                <div className="pl-80 pl-md-0 pl-xs-0">
                                    <h4 className="sub-title">Why Creative Line</h4>
                                    <h2 className="title">Unlock Growth Through Design & Strategy</h2>
                                    <div className="faq-style-one accordion mt-30" id="faqAccordion">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Strategic Creativity
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        We don’t just design — we build digital experiences that connect with people and strengthen brands. Every concept is backed by data, storytelling, and purpose.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    SEO & Performance Optimization
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Our websites are optimized for search engines and conversions from day one. We focus on visibility, speed, and user experience to generate real growth.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Long-Term Partnership
                                                </button>
                                            </h2>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        We see ourselves as your technology and marketing partner — helping your business evolve, not just launch projects.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="award-items">
                                    <div className="award-item wow fadeInLeft">
                                        <i className="fas fa-lightbulb" />
                                        <h4>Creative Strategy </h4>
                                    </div>
                                    <div className="award-item wow fadeInLeft" data-wow-delay="100ms">
                                        <i className="fas fa-code" />
                                        <h4>Technology Expertise</h4>
                                    </div>
                                    <div className="award-item wow fadeInLeft" data-wow-delay="200ms">
                                        <i className="fas fa-globe" />
                                        <h4>Global Mindset</h4>
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

export default WhyChooseV1;
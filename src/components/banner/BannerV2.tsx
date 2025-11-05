import Image from "next/image";
import arrowRight from "@/assets/img/icon/arrow-right.png"
import thumb5 from "@/assets/img/thumb/5.jpg"
import thumb6 from "@/assets/img/thumb/6.jpg"
import shape1 from "@/assets/img/shape/1.png"
import SplitAnimation from "../animation/SplitAnimation";

const BannerV2 = () => {
    return (
        <>
            <div className="banner-style-two-area">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-7">
                            <div className="banner-two-content">
                                <h2 className="item-title">Crafting <strong>Digital</strong></h2>
                                <h2 className="item-title text-end"><Image src={arrowRight} alt="Image Not Found" /> Experience</h2>
                                <div className="d-flex">
                                    <Image src={thumb5} alt="Image Not Found" />
                                    <SplitAnimation>
                                        <p className="split-text">
                                            Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out.
                                        </p>
                                    </SplitAnimation>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 offset-lg-1">
                            <div className="banner-two-thumb">
                                <Image src={thumb6} alt="Image Not Found" />
                                <Image src={shape1} alt="Image Not Found" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerV2;
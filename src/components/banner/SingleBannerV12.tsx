import Image from "next/image";
import shape16 from "@/assets/img/shape/16.png"

interface DataType {
    id: number;
    modal: string;
    thumb: string;
    titleFirst: string;
    titleLast: string;
    description: string;
    tags: string[];
}

const SingleBannerV12 = ({ banner }: { banner: DataType }) => {
    const { titleFirst, titleLast, description, tags, modal, thumb } = banner;

    return (
        <>
            <div className="container">
                <div className="full-slider-two-item">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-4">
                            <div className="thumb">
                                <Image src={`/assets/img/portfolio/${thumb}`} alt="Image Not Found" width={800} height={1000} />
                            </div>
                        </div>
                        <div className="col-lg-7 offset-lg-1 col-md-8">
                            <div className="item-info">
                                <div className="content">
                                    <h2>
                                        <a
                                            href="#"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#${modal}`}
                                        >
                                            {titleFirst}{' '}
                                            <strong>
                                                <Image src={shape16} alt="Image Not Found" /> {titleLast}
                                            </strong>
                                        </a>
                                    </h2>
                                    <div className="info">
                                        <p>{description}</p>
                                        <a
                                            className="btn-animation mt-10"
                                            href="#"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#${modal}`}
                                        >
                                            <i className="fas fa-arrow-right" />
                                            <span>Know More</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-tags">
                        <ul>
                            {tags.map((tag, index) => (
                                <li key={index}>
                                    <a href="#">{tag}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBannerV12;

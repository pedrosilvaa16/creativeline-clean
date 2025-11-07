import Image from "next/image";
import Link from "next/link";

interface DataType {
    id?: number;
    thumb?: string;
    title?: string;
    tag?: string;
}

const SinglePortfolioV4 = ({ portfolio }: { portfolio: DataType }) => {
    const { thumb, id, tag, title } = portfolio

    return (
        <>
            <div className="portfolio-style-four">
                <div className="thumb">
                    <Image src={`/assets/img/portfolio/${thumb}`} alt="Image Not Found" width={700} height={600} />
                    <div className="content">
                        <span>{tag}</span>
                        <Link href={`/project-details/${id}`}>
                            <h2>{title}</h2>
                        </Link>
                        <Link className="btn-animation" href={`/project-details/${id}`}>
                            <i className="fas fa-arrow-right" /> <span>View Project</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SinglePortfolioV4;
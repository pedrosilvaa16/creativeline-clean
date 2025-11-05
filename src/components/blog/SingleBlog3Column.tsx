import Image from 'next/image';
import Link from 'next/link';

interface DataType {
    id: number;
    thumb: string;
    title2: string;
    date: string;
    author: string;
}

const SingleBlog3Column = ({ blog }: { blog: DataType }) => {
    const { id, thumb, title2, date, author } = blog

    return (
        <>
            <div className="home-blog-style-one">
                <div className="thumb">
                    <Link href={`/blog-single-with-sidebar/${id}`}>
                        <Image src={`/assets/img/blog/${thumb}`} width={800} height={600} alt="Thumb" />
                    </Link>
                    <div className="info">
                        <div className="meta">
                            <ul>
                                <li>
                                    <Link href="#" scroll={false}>{author}</Link>
                                </li>
                                <li>{date}</li>
                            </ul>
                        </div>
                        <h2 className="post-title">
                            <Link href={`/blog-single-with-sidebar/${id}`}>{title2}</Link>
                        </h2>
                        <Link href={`/blog-single-with-sidebar/${id}`} className="button-regular">
                            Continue Reading
                            <i className="fas fa-long-arrow-right" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog3Column;
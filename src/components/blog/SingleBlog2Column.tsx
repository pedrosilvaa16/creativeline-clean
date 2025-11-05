import Image from 'next/image';
import Link from 'next/link';

interface DataType {
    id: number;
    thumb: string;
    title: string;
    author: string;
    date: string;
}

const SingleBlog2Column = ({ blog }: { blog: DataType }) => {
    const { id, thumb, author, title, date } = blog

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
                            <Link href={`/blog-single-with-sidebar/${id}`}>{title}</Link>
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

export default SingleBlog2Column;
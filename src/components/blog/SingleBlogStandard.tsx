import Image from 'next/image';
import Link from 'next/link';

interface DataType {
    id: number;
    thumb: string;
    date: string;
    title: string;
    text: string;
    author: string;
}

const SingleBlogStandard = ({ blog }: { blog: DataType }) => {
    const { id, thumb, date, title, text, author } = blog

    return (
        <>
            <div className="blog-style-one item">
                <div className="thumb">
                    <Link href={`/blog-single-with-sidebar/${id}`}>
                        <Image src={`/assets/img/blog/${thumb}`} alt="Image Not Found" width={1500} height={750} />
                    </Link>
                </div>
                <div className="info">
                    <div className="meta">
                        <ul>
                            <li>
                                <Link href="#" scroll={false}>{author}</Link>
                            </li>
                            <li>
                                {date}
                            </li>
                        </ul>
                    </div>
                    <h2>
                        <Link href={`/blog-single-with-sidebar/${id}`}>{title}</Link>
                    </h2>
                    <p>{text}</p>
                    <Link className="button-regular" href={`/blog-single-with-sidebar/${id}`}>
                        Continue Reading <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SingleBlogStandard;
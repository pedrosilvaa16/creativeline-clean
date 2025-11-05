import Image from 'next/image';
import Link from 'next/link';

interface DataType {
    id: number;
    thumb: string;
    author: string;
    dateFull: string;
    comments: number;
    month: string;
    title: string;
}

const SingleBlogV1 = ({ blog }: { blog: DataType }) => {
    const { id, thumb, author, dateFull, comments, title } = blog

    return (
        <>
            <div className="home-blog-one">
                <div className="thumb">
                    <Link href={`/blog-single-with-sidebar/${id}`}>
                        <Image src={`/assets/img/blog/${thumb}`} alt="Image Not Found" width={800} height={1000} />
                    </Link>
                    <div className="date">{dateFull}</div>
                </div>
                <div className="content">
                    <div className="meta">
                        <ul>
                            <li>
                                <Link href="#" scroll={false}>{author}</Link>
                            </li>
                            <li>
                                <Link href="#" scroll={false}>{comments} Comments</Link>
                            </li>
                        </ul>
                    </div>
                    <h3><Link href={`/blog-single-with-sidebar/${id}`}>{title}</Link></h3>
                    <Link href={`/blog-single-with-sidebar/${id}`} className="button-regular">
                        Continue Reading
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SingleBlogV1;
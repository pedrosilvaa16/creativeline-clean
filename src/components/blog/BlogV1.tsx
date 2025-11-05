import BlogV1Data from '@/assets/jsonData/blog/BlogV1Data.json';
import SingleBlogV1 from './SingleBlogV1';
import SplitAnimation from '../animation/SplitAnimation';

interface DataType {
    sectionClass?: string
}

const BlogV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`blog-area home-blog blog-style-one-area default-padding bottom-less ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 offset-lg-3">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">News & Events</h4>
                                <SplitAnimation>
                                    <h2 className="title split-text">Latest blog posts </h2>
                                </SplitAnimation>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {BlogV1Data.slice(0, 3).map(blog =>
                            <div className="col-lg-4 col-md-6 mb-30" key={blog.id}>
                                <SingleBlogV1 blog={blog} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogV1;
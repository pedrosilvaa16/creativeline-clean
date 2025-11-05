"use client"
import useHoverEffect from '@/hooks/useHoverEffect';
import Image from 'next/image';
import Link from 'next/link';

interface DataType {
    id: number;
    number: string;
    title: string;
    thumb: string;
}

const SingleServiceV5 = ({ service }: { service: DataType }) => {
    const { id, number, title, thumb } = service;

    const { handleMouseMove, handleMouseLeave } = useHoverEffect();

    return (
        <>
            <li>
                <Link
                    href={`/service-details/${id}`}
                    className="image-hover-item"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="item-content">
                        <span>{number}</span>
                        <h2>{title}</h2>
                    </div>
                    <div className="image-hover-wrapper">
                        <Image
                            className="image-hover-placeholder"
                            src={`/assets/img/portfolio/${thumb}`}
                            alt="Image Not Found"
                            width={600}
                            height={600}
                        />
                    </div>
                </Link>
            </li>
        </>
    );
};

export default SingleServiceV5;
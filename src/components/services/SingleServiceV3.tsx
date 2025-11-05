import Image from 'next/image';
import Link from 'next/link';

interface DataType {
    id: number;
    icon: string;
    iconLight: string;
    titleFirst: string;
    titleLast: string;
    text: string;
    number: string;
}

const SingleServiceV3 = ({ service }: { service: DataType }) => {
    const { id, icon, iconLight, titleFirst, titleLast, text, number } = service

    return (
        <>
            <div className="service-three-content">
                <div className="top">
                    <div className="icon">
                        <Image className="regular-img" src={`/assets/img/icon/${icon}`} alt="Image Not Found" width={130} height={130} />
                        <Image className="light-img" src={`/assets/img/icon/${iconLight}`} alt="Image Not Found" width={130} height={130} />
                    </div>
                </div>
                <div className="info">
                    <h4><Link href={`/service-details/${id}`}>{titleFirst} <br /> {titleLast}</Link></h4>
                    <p>{text}</p>
                </div>
                <div className="bottom">
                    {number}
                </div>
            </div>
        </>
    );
};

export default SingleServiceV3;
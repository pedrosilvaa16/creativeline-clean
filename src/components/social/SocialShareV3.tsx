import Image from 'next/image';
import twitter from '@/assets/img/icon/twitter.png';
import Link from 'next/link';

const SocialShareV3 = () => {
    return (
        <>
            <li>
                <Link className="facebook" href="https://www.facebook.com/" target="_blank">
                    <i className="fab fa-facebook-f" />
                </Link>
            </li>
            <li>
                <Link className="twitter" href="https://www.x.com" target="_blank">
                    <Image src={twitter} alt="Image Not Found" />
                </Link>
            </li>
            <li>
                <Link className="linkedin" href="https://www.pinterest.com/" target="_blank">
                    <i className="fab fa-pinterest-p" />
                </Link>
            </li>
            <li>
                <Link className="linkedin" href="https://www.linkedin.com/" target="_blank">
                    <i className="fab fa-linkedin-in" />
                </Link>
            </li>
        </>
    );
};

export default SocialShareV3;
import Link from 'next/link';


const SocialShareV1 = () => {
    return (
        <>
            <li>
                <Link href="https://www.linkedin.com/" target='_blank'><i className="fab fa-linkedin-in" /></Link>
            </li>
            <li>
                <Link href="https://www.dribbble.com/" target='_blank'><i className="fab fa-dribbble" /></Link>
            </li>
            <li>
                <Link href="https://www.facebook.com/" target='_blank'><i className="fab fa-facebook-f" /></Link>
            </li>
        </>
    );
};

export default SocialShareV1;
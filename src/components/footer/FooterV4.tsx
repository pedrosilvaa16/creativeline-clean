import Image from 'next/image';
import Link from 'next/link';
import NewsletterV2 from '../newsletter/NewsletterV2';
import FooterSocial from '../social/FooterSocial';

const logoLight = "/assets/img/logo-light.png";
const logo = "/assets/img/logo.png";

interface DataType {
    sectionClass?: string;
}

const FooterV4 = ({ sectionClass }: DataType) => {
    return (
        <>
            <footer className={`${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="f-items">
                        <div className="row">
                            <div className="col-lg-6 footer-item about pr-120 pr-md-15 pr-xs-15 pr-md-15 pr-xs-15">
                                <div className="top">
                                    <Image
                                      className="regular-img"
                                      src={logoLight}
                                      alt="Logo Light"
                                      width={140}
                                      height={40}
                                    />
                                    <Image 
                                      className="light-img"
                                        src={logo}
                                        alt="Image Not Found"
                                        width={140}
                                        height={40}
                                      />
                                </div>
                                <ul className="address-list">
                                    <li>
                                        <h4>U.S.A.</h4>
                                        <p>
                                            490 Post St, Ste 500 PMB 2269 San Francisco, CA 94102
                                        </p>
                                    </li>
                                    <li>
                                        <h4>Portugal</h4>
                                        <p>
                                            Rua Eusébio da Silva Ferreira, 33C - loja 19 4630-463
                                        </p>
                                    </li>
                                </ul>
                                <div className="footer-contact">
                                    <ul>
                                        <li>
                                            <a href="mailto:someone@example.com">geral@creativeline.studio</a>
                                        </li>
                                        <li>
                                            <a href="tel:+4733378901">+351 916 021 806</a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <div className="col-lg-5 offset-lg-1 footer-item">
                                <h4 className="widget-title">Useful Link</h4>
                                <ul className="useful-link">
                                    <li><Link href="/about-us">About Us</Link></li>
                                    <li><Link href="/contact-us">Contact</Link></li>
                                    <li><Link href="/faq">FAQS</Link></li>
                                    <li><Link href="/services">Services</Link></li>
                                    <li><Link href="/about-us">Term & Conditions</Link></li>
                                    <li><Link href="/about-us">Privacy Policy</Link></li>
                                    <li><Link href="/about-us">Careers</Link></li>
                                    <li><Link href="/contact-us">Help Desk</Link></li>
                                </ul>
                                <NewsletterV2 />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <ul className="footer-social">
                                    <FooterSocial />
                                </ul>
                            </div>
                            <div className="col-lg-6 text-end">
                                <p>
                                    Copyright &copy; {(new Date().getFullYear())} Dixor. All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterV4;


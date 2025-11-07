import AboutV6 from '@/components/about/AboutV6';
import BannerV1 from '@/components/banner/BannerV1';
import BlogV1 from '@/components/blog/BlogV1';
import BrandV1 from '@/components/brand/BrandV1';
import DarkClass from '@/components/classes/DarkClass';
import ClientsV1 from '@/components/clients/ClientsV1';
import MultiSection from '@/components/multi/MultiSection';
import PortfolioV4 from '@/components/portfolio/PortfolioV4';
import ProjectV1 from '@/components/project/ProjectV1';
import ServicesV5 from '@/components/services/ServicesV5';
import ThemeDark from '@/components/switcher/ThemeDark';
import TeamV3 from '@/components/team/TeamV3';
import TestimonialV3 from '@/components/testimonial/TestimonialV3';



export const metadata = {
    title: "Dixor - Creative Digital Agency"
};

const Home1 = () => {
    return (
        <>
            <div className="smooth-scroll-container">
                <BannerV1 />
                <BrandV1 />
                <ServicesV5 sectionClass='bg-gray' />
                <AboutV6 sectionClass="default-padding" />
                <ProjectV1 />
                <TeamV3 sectionClass='bg-gray' hasTitle={true} />
                <PortfolioV4 sectionClass='bg-gray default-padding' hasTitle={true} />      
                <TestimonialV3 />
                <ClientsV1 sectionClass='bg-gray' />
                <MultiSection />        
                <BlogV1 sectionClass='bg-gray' />
                <DarkClass />
                <ThemeDark />
            </div>
        </>
    );
};

export default Home1;
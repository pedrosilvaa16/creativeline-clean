import AboutV6 from '@/components/about/AboutV6';
import BannerV1 from '@/components/banner/BannerV1';
import BlogV2 from '@/components/blog/BlogV2';
import DarkClass from '@/components/classes/DarkClass';
import ClientsV1 from '@/components/clients/ClientsV1';
import MultiSection from '@/components/multi/MultiSection';
import ProjectV1 from '@/components/project/ProjectV1';
import ServicesV5 from '@/components/services/ServicesV5';
import ThemeDark from '@/components/switcher/ThemeDark';
import TeamV1 from '@/components/team/TeamV1';
import TestimonialV3 from '@/components/testimonial/TestimonialV3';

export const metadata = {
    title: "Dixor - Creative Digital Agency"
};

const Home1 = () => {
    return (
        <>
            <div className="smooth-scroll-container">
                <BannerV1 />
                <ServicesV5 sectionClass='bg-gray' />
                <AboutV6 sectionClass="default-padding" />
                <ProjectV1 />
                <TeamV1 sectionClass='bg-gray' hasTitle={true} />
                <TestimonialV3 />
                <ClientsV1 sectionClass='bg-gray' />
                <MultiSection />
                <BlogV2 sectionClass='bg-gray' />
                <DarkClass />
                <ThemeDark />
            </div>
        </>
    );
};

export default Home1;
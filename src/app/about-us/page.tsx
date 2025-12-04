import AboutV6 from '@/components/about/AboutV6';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import DarkClass from '@/components/classes/DarkClass';
import FunFactV1 from '@/components/fact/FunFactV1';
import LayoutV1 from '@/components/layouts/LayoutV1';
import PartnerV2 from '@/components/partner/PartnerV2';
import ThemeDark from '@/components/switcher/ThemeDark';
import TeamV1 from '@/components/team/TeamV1';
import TestimonialV3 from '@/components/testimonial/TestimonialV3';

export const metadata = {
    title: "Creative Line - About Us"
};

const AboutUsPage = () => {
    return (
        <>
            <LayoutV1>
                <Breadcrumb title='About Creative Line' breadCrumb='About' />
                <AboutV6 sectionClass='bg-gray default-padding' />
                <FunFactV1 sectionClass='default-padding-bottom bg-gray' />
                <PartnerV2 />
                <TeamV1 sectionClass='bg-gray' hasTitle={true} />
                <TestimonialV3 />
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default AboutUsPage;
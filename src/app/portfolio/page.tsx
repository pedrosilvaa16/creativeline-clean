// src/app/portfolio/page.tsx
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DarkClass from "@/components/classes/DarkClass";
import LayoutV1 from "@/components/layouts/LayoutV1";
import PortfolioV2 from "@/components/portfolio/PortfolioV2";
import ThemeDark from "@/components/switcher/ThemeDark";

export const metadata = { title: "Portfolio — Creative Line" };
export const revalidate = 60;

export default function PortfolioArchive({
  searchParams,
}: { searchParams: { after?: string } }) {
  const after = searchParams?.after ?? null;

  return (
    <LayoutV1>
      <Breadcrumb title="Case Studies" breadCrumb="Portfolio" />
      <PortfolioV2
        hasTitle={false}
        moreBtn={true}
        sectionClass=""
        first={8}
        after={after}
      />
      <DarkClass />
      <ThemeDark />
    </LayoutV1>
  );
}

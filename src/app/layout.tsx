import HeaderV1 from "@/components/header/HeaderV1";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Suspense } from "react";
import ClientProviders from "@/components/utilities/ClientProviders";
import FooterV4 from "@/components/footer/FooterV4";
import Script from "next/script";

// CSS globais (tema/bibliotecas) — mantém como já tens
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css/bundle";
import "react-toastify/dist/ReactToastify.css";
import "react-photo-view/dist/react-photo-view.css";
import "react-circular-progressbar/dist/styles.css";

// CSS do tema
import "@/assets/css/animate.css";
import "@/assets/css/font-awesome.css";
import "@/assets/css/flaticon-set.css";
import "@/assets/css/helper.css";
import "@/assets/css/unit-test.css";
import "@/assets/css/validnavs.css";
import "@/assets/css/style.css";

export const metadata: Metadata = {
  title: "Creative Line — Portfolio & Digital Studio",
};

const barlow = Barlow({
  weight: ["100","200","300","400","500","600","700","800"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-dark" suppressHydrationWarning>
      <head> 
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var KEY = 'theme';
                var t = localStorage.getItem(KEY) || 'dark';
                var d = document.documentElement; // aplica no <html>
                if (t === 'dark') d.classList.add('bg-dark'); else d.classList.remove('bg-dark');
                d.style.colorScheme = (t === 'dark') ? 'dark' : 'light';
              } catch (e) {
                document.documentElement.classList.add('bg-dark');
              }
            })();
          `}
        </Script>
        {/* Evita flash branco enquanto o CSS não carregou */}
        <style>{`:root.bg-dark, :root.bg-dark body { background:#0b0b0b; }`}</style>
      </head>
      <body className={barlow.className}>
        <HeaderV1 />
        {children}
        <Suspense fallback={null}>
          <ClientProviders />
        </Suspense>
        <FooterV4 />
      </body>
    </html>
  );
}

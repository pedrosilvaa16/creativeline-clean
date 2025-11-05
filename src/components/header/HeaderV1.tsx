"use client";

import Image from "next/image";
import Link from "next/link";
import MainMenu from "./MainMenu";
import useSubMenuToggle from "@/hooks/useSubMenuToggle";
import SidebarInfo from "./SidebarInfo";
import useSidebarInfo from "@/hooks/useSidebarInfo";
import useSidebarMenu from "@/hooks/useSidebarMenu";
import useStickyMenu from "@/hooks/useStickyMenu";

// ADAPTAÇÃO: como colocaste os assets em /public/assets,
// usamos strings no src (Next <Image> aceita strings /public/...).
const logo = "/assets/img/logo.png";
const logoLight = "/assets/img/logo-light.png";

const HeaderV1 = () => {
  const { isOpen, openMenu, closeMenu } = useSidebarMenu();
  const toggleSubMenu = useSubMenuToggle();
  const { isInfoOpen, openInfoBar, closeInfoBar } = useSidebarInfo();
  const isMenuSticky = useStickyMenu();

  return (
    <header>
      <nav
        className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs navbar-fixed on menu-center ${
          isMenuSticky ? "sticked" : "no-background"
        } ${isOpen ? "navbar-responsive" : ""}`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar-menu"
              onClick={openMenu}
              aria-label="Open menu"
            >
              <i className="fa fa-bars" />
            </button>

            <Link className="navbar-brand" href="/">
              {/* logo display / scrolled / dark */}
              <Image
                src={logoLight}
                alt="Logo"
                width={250}
                height={0}
                className="logo logo-display"
                priority
              />
              <Image
                src={logoLight}
                alt="Logo"
                width={250}
                height={0}
                className="logo logo-scrolled"
              />
              <Image
                src={logo}
                alt="Logo"
                width={250}
                height={0}
                className="logo-dark"
              />
            </Link>
          </div>

          <div
            className={`collapse navbar-collapse ${isOpen ? "show collapse-mobile" : "collapse-mobile"}`}
            id="navbar-menu"
          >
            <Image className="regular-img" src={logoLight} alt="Logo" width={140} height={36} />
            <Image className="light-img" src={logo} alt="Logo" width={140} height={36} />

            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar-menu"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <i className="fa fa-times" />
            </button>

            <MainMenu toggleSubMenu={toggleSubMenu} navbarPlacement="navbar-center" />
          </div>

          <SidebarInfo openInfoBar={openInfoBar} closeInfoBar={closeInfoBar} isInfoOpen={isInfoOpen} />
        </div>

        <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu} />
      </nav>
    </header>
  );
};

export default HeaderV1;

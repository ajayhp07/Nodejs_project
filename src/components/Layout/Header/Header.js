import React, { useEffect, useRef, useState } from "react";
import style from "./HeaderNew.module.css";
import { NavLink } from "react-router-dom";
import HeaderDropdown from "./HeaderComponents/HeaderDropDown";
import Logo from "../../Logo/Logo";

const Header = ({ links, buttons, dropdownLinks, JoinUsBarData }) => {
  const sideNavbarRef = useRef(null);
  const mobileMenuIconRef = useRef(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 700;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sideNavbarRef.current &&
        !sideNavbarRef.current.contains(event.target) &&
        mobileMenuIconRef.current &&
        !mobileMenuIconRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen && width < breakpoint) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMobileMenuOpen, width]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navElements = links.map((link, index) => (
    <li key={index} className={style.element}>
      <NavLink
        to={link.address}
        title={`Link to ${link.name}`}
        onClick={handleMobileMenuToggle}
        className={({ isActive }) =>
          isActive ? `${style.active} ${style.mainNavLink}` : style.mainNavLink
        }
      >
        {link.name}
      </NavLink>
    </li>
  ));

  const dropdownElements = dropdownLinks
    ? dropdownLinks.map((link, index) => (
        <li key={index} className={style.dropdownElement}>
          <NavLink
            to={link.address}
            title={`Link to ${link.name}`}
            onClick={handleMobileMenuToggle}
            className={style.dropdownLink}
            onMouseEnter={() => setShowDropDown(index)}
            onMouseLeave={() => setShowDropDown(null)}
            style={{
              borderBottom: showDropDown === index && `3px solid #ff6501`,
            }}
          >
            {link.name}
          </NavLink>
          {/* {index === showDropDown && ( */}
          <HeaderDropdown
            onMouseEnter={() => setShowDropDown(index)}
            onMouseLeave={() => setShowDropDown(null)}
            data={link.content}
            style={{ display: index === showDropDown ? "flex" : "none" }}
          />
          {/* )} */}
        </li>
      ))
    : null;

  const navButtons = buttons.map((button, index) => (
    <NavLink key={index} className={style.signUpBtn} to={button.link}>
      {button.name}
    </NavLink>
  ));

  const JoinUsBar = (
    <div className={style.joinUsBar}>
      <p>Join Us Via</p>
      <ul>
        {JoinUsBarData.socialMediaIcons.map((icon, index) => (
          <li key={index}>
            <a href={icon.address}>
              <img
                src={require(`../../../assets/socialMediaIcons/${icon.src}`)}
                alt={icon.alt}
              ></img>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <nav className={style.Header}>
      <Logo />
      <div className={style.navbar}>
        {JoinUsBar}
        <div className={style.navBackground}>
          <div className={style.triangle}></div>

          <div className={style.nav}>{navElements}</div>
        </div>
        {dropdownLinks && (
          <div className={style.lowerBar}>
            <div className={style.dropdownNavbar}>
              <ul className={style.dropdownNav}>{dropdownElements}</ul>
            </div>
            {navButtons}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

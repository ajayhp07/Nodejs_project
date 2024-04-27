import { NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";
import style from "./Footer.module.css";
import { useEffect, useState } from "react";

const Footer = ({ links, quickLinks, ContactUs, JoinUsBarData }) => {
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

  const navElements = (
    <div className={style.navElements}>
      {links.map((link, index) => (
        <li key={index} className={style.element}>
          <NavLink
            to={link.address}
            title={`Link to ${link.name}`}
            className={({ isActive }) =>
              isActive
                ? `${style.active} ${style.mainNavLink}`
                : style.mainNavLink
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </div>
  );

  const QuickLinks = (
    <div className={style.navElements}>
      <p className={style.head}>Quick Links</p>
      {quickLinks.map((link, index) => (
        <li key={index} className={style.element}>
          <NavLink
            to={link.address}
            title={`Link to ${link.name}`}
            className={({ isActive }) =>
              isActive
                ? `${style.active} ${style.mainNavLink}`
                : style.mainNavLink
            }
            style={{ marginLeft: "1rem" }}
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </div>
  );

  const ContactUsSection = (
    <div className={style.contactUs}>
      <p className={style.head}>Contact Us</p>
      <div className={style.allContacts}>
        <div className={style.contact}>
          <img
            src={require("../../../assets/footer/HomeWork.png")}
            alt=""
          ></img>
          <p>{ContactUs.address}</p>
        </div>
        <div className={style.contact}>
          <img src={require("../../../assets/footer/Call.png")} alt=""></img>
          <p>{ContactUs.phoneNumber}</p>
        </div>
        <div className={style.contact}>
          <img src={require("../../../assets/footer/Email.png")} alt=""></img>
          <p>{ContactUs.infoEmailId}</p>
        </div>
      </div>
    </div>
  );

  const JoinUsBar = (
    <div className={style.joinUsBar}>
      <p className={style.head}>Join Us Via</p>
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
    <div className={style.Footer}>
      <Logo />
      {width < breakpoint ? (
        <>
          <div className={style.navAndQuick}>
            {navElements}
            {QuickLinks}
          </div>
          <div className={style.contactAndJoin}>
            {ContactUsSection}
            {JoinUsBar}
          </div>
        </>
      ) : (
        <>
          {navElements}
          {QuickLinks}
          {ContactUsSection}
          {JoinUsBar}
        </>
      )}
    </div>
  );
};
export default Footer;

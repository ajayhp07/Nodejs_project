import Section from "../../../UI/Sections/Section";
import style from "./OurPartners.module.css";
const OurPartners = () => {
  return (
    <div className={style.OurPartnersSection}>
      <Section title="Our Partners" />
      {/* <img
        src={require("../../../assets/aboutus/ourPartners.png")}
        alt=""
        className={style.background}
      /> */}
      <div className={style.content}>
        <h1>We work with</h1>
        <p>
          Coming together is a beginning, staying together is progress, and
          working together is success.
        </p>
      </div>
    </div>
  );
};

export default OurPartners;

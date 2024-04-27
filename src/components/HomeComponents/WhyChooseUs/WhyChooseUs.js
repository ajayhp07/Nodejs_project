import Section from "../../../UI/Sections/Section";
import style from "./WhyChooseUs.module.css";

const WhyChooseUsData = [
  {
    heading: "Lorem ipsum 1",
    content:
      "Lorem ipsum dolor sit amet consectetur. Sodales eget convallis sem iaculis. Nunc nulla tempus dictumst elementum placerat sit donec malesuada. ",
  },
  {
    heading: "Lorem ipsum 2",
    content:
      "Lorem ipsum dolor sit amet consectetur. Sodales eget convallis sem iaculis. Nunc nulla tempus dictumst elementum placerat sit donec malesuada. ",
  },
  {
    heading: "Lorem ipsum 3",
    content:
      "Lorem ipsum dolor sit amet consectetur. Sodales eget convallis sem iaculis. Nunc nulla tempus dictumst elementum placerat sit donec malesuada. ",
  },
  {
    heading: "Lorem ipsum 4",
    content:
      "Lorem ipsum dolor sit amet consectetur. Sodales eget convallis sem iaculis. Nunc nulla tempus dictumst elementum placerat sit donec malesuada. ",
  },
];

const WhyChooseUs = () => {
  return (
    <div>
      <Section title="Why Choose Us">
        <div className={style.WhyChooseUsPoints}>
          {WhyChooseUsData.map((data, index) => {
            return (
              <WhyChooseUsPoints
                key={index}
                heading={data.heading}
                content={data.content}
              ></WhyChooseUsPoints>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

const WhyChooseUsPoints = ({ heading, content }) => {
  return (
    <div className={style.WhyChooseUsPoint}>
      <h1>{heading}</h1>
      <p>{content}</p>
    </div>
  );
};

export default WhyChooseUs;

import React from "react";
import "../../../public/assets/scss/about.scss";
import Image from "next/image";
import discussImg from "../../../public/assets/images/discuss.png";
import alexaImg from "../../../public/assets/images/alexa.png";
import oliviaImg from "../../../public/assets/images/olivia.png";
import liamImg from "../../../public/assets/images/liam.png";
import elijiaImg from "../../../public/assets/images/elijia.png";

export const metadata = {
  title: "Giới thiệu - Mindmap Flow",
  description: "Mindmap Flow - Công cụ xây dựng sơ đồ tư duy mạnh mẽ",
};

function About() {
  return (
    <section id="about">
      <div>
        <div className="about-us">
          <div className="about-us-content">
            <span>About Us</span>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum.In the first place we have granted to
              God, and by this our present charter confirmed for us and our
              heirs forever that the English Church shall be free, and shall
              have her rights entire, and her liberties inviolate; and we will
              that it be thus observed; which is apparent from
            </p>
          </div>
          <div className="about-us-img">
            <Image src={discussImg} alt="about-us" />
          </div>
        </div>
        <div className="about-story">
          <div className="about-story-content">
            <span>Our Story</span>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum.In the first place we have granted to
              God, and by this our present charter confirmed for us and our
              heirs forever that the English Church shall be free, and shall
              have her rights entire, and her liberties inviolate; and we will
              that it be thus observed; which is apparent from
            </p>
          </div>
          <div className="about-story-img">
            <div>
              <Image src={alexaImg} alt="alexa" />
              <span>Alexa</span>
            </div>
            <div>
              <Image src={oliviaImg} alt="olivia" />
              <span>Olivia</span>
            </div>
            <div>
              <Image src={liamImg} alt="liam" />
              <span>Liam</span>
            </div>
            <div>
              <Image src={elijiaImg} alt="elijia" />
              <span>Elijia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

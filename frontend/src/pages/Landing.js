import React, { Fragment } from "react";
import CourseSlider from "../components/courseSlider/CourseSlider";
import CtaTop from "../components/ctaTop/CtaTop";

const Landing = () => {
  return (
    <Fragment>
      <CtaTop />
      <CourseSlider />
    </Fragment>
  );
};

export default Landing;

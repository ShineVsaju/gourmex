import React from "react";
// import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
          One of the Best among the Business, right now!
        </p>
      </div>
      <div className="testimonial-section-bottom">
        {/* <img src={ProfilePic} alt="" /> */}
        <p>
         One of the best diet plans i have followed consistently. This is tasty without any of the regrets that comes with it. Love it and will 
         stick to it unitll i reach my fitness goal!
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Jhonny Pappachan  </h2>
      </div>
    </div>
  );
};

export default Testimonial;
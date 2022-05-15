import React from "react";
import bg from "../../assets/images/bg.png";
import chair from "../../assets/images/chair.png";
import PrimaryButton from "../Shared/PrimaryButton";

const Banner = () => {
  return (
    <div
      className={`hero min-h-[500px] bg-base-200 bg-cover bg-no-repeat mb-10`}
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt="" />
        <div>
          <h1 className="text-5xl font-bold">Your new smile starts here</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Banner;

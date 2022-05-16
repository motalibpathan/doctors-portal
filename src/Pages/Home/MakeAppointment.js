import React from "react";
import appointment from "../../assets/images/appointment.png";
import doctor from "../../assets/images/doctor.png";
import PrimaryButton from "../Shared/PrimaryButton";

const MakeAppointment = () => {
  return (
    <section
      style={{ background: `url(${appointment})` }}
      className="flex justify-center items-center"
    >
      <div className="flex-1 hidden lg:block">
        <img className="mt-[-150px]" src={doctor} alt="" />
      </div>
      <div className="flex-1 p-5">
        <h3 className="mt- text-xl text-primary font-bold">Appointment</h3>
        <h2 className="text-3xl text-white font-bold py-5">
          Make an Appointment Today
        </h2>
        <p className="text-white pb-5">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
          pariatur labore mollitia delectus nisi culpa illum laborum assumenda
          omnis. Laboriosam nesciunt quisquam hic, mollitia sint quidem
          recusandae ut earum voluptates vitae nostrum dolor velit. Sapiente
          fugit ullam distinctio et doloribus!
        </p>
        <PrimaryButton>Get Started</PrimaryButton>
      </div>
    </section>
  );
};

export default MakeAppointment;

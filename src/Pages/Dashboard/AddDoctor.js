import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const { data: services, isLoading } = useQuery("services", () =>
    fetch("https://salty-river-38714.herokuapp.com/services").then((res) =>
      res.json()
    )
  );

  const imageStorageKey = "5e0535abd7d9d6b60c4e5a1b225e1823";

  /**
   * 3 ways to store image
   * 1. Third party storage // free open public storage is ok for practice project
   * 2. your own storage in your own server (file system)
   * 3. Database: Mongodb
   *
   * YUP to validate file ; search YUP file validation for react hook form
   *
   */

  const onSubmit = async (data) => {
    console.log(data);
    const image = data.image[0];
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    const formData = new FormData();
    formData.append("image", image);
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            img,
          };
          // sent to your database
          fetch(`https://salty-river-38714.herokuapp.com/doctor`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((inserted) => {
              console.log("doctor", inserted);
              if (inserted.insertedId) {
                toast.success("Doctor added successfully");
                reset();
                setLoading(false);
              } else {
                setLoading(false);
                toast.error("Failed to add the doctor");
              }
            });
        }
      });
  };
  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-2xl my-3"> Add a new Doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required",
              },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full max-w-xs"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Provide a valid email",
              },
            })}
          />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select
            {...register("specialty")}
            className=" w-full p-3 rounded-lg border"
          >
            {services.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            className="form-control block w-full px-3 py-3 rounded-md text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            {...register("image", {
              required: {
                value: true,
                message: "Image is Required",
              },
            })}
          />
          <label className="label">
            {errors.image?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.image.message}
              </span>
            )}
          </label>
        </div>

        <input
          type="submit"
          className="btn w-full max-w-xs mt-3"
          value={"Add "}
        />
      </form>
    </div>
  );
};

export default AddDoctor;

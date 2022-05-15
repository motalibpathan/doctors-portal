import React from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const Login = () => {
  const [signInWitGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let signInError;

  if (loading || gLoading) {
    return <Loading />;
  }

  if (error || gError) {
    signInError = (
      <p className="text-red-500 mb-2">
        <small>{error?.message || gError?.error}</small>
      </p>
    );
  }

  if (user || gUser) {
    console.log(user || gUser);
  }

  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="font-bold text-xl text-center">Please Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                class="input input-bordered w-full max-w-xs"
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
              <label class="label">
                {errors.email?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span class="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                class="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <label class="label">
                {errors.password?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span class="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {signInError}
            <input
              type="submit"
              className="btn w-full max-w-xs"
              value={"Login"}
            />
          </form>
          <p>
            New to Doctors Portal ?{" "}
            <Link className="text-primary" to={"/signup"}>
              Create new account
            </Link>{" "}
          </p>
          <div class="divider">OR</div>
          <button
            onClick={() => signInWitGoogle()}
            className="uppercase btn btn-outline btn-accent"
          >
            <img
              width={20}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="google"
            />
            <span className="ml-2"> Continue With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

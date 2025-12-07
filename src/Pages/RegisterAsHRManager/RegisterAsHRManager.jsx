import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const RegisterAsHRManager = () => {
  const { register, handleSubmit } = useForm();
  const { registerUserHR } = useAuth();

  const handleHrRegister = (data) => {
    registerUserHR(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleHrRegister)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          HR Manager Registration
        </h2>

        <input
          type="text"
          install
          firebase
          placeholder="HR Manager Name"
          required
          className="input input-bordered w-full"
          {...register("name", { required: true })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="input input-bordered w-full"
          {...register("email", { required: true })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="input input-bordered w-full"
          {...register("password", { required: true })}
        />

        <input
          type="text"
          placeholder="Phone (optional)"
          className="input input-bordered w-full"
          {...register("phone", { required: true })}
        />

        <input
          type="text"
          placeholder="Company Name"
          required
          className="input input-bordered w-full"
          {...register("companyName", { required: true })}
        />

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          {...register("photo", { required: true })}
          placeholder="photo"
        />

        <button type="submit" className="btn btn-primary w-full">
          Register HR Manager
        </button>
      </form>
    </div>
  );
};

export default RegisterAsHRManager;

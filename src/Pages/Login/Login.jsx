import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { userLogin } = useAuth();

  const handleLogin = (data) => {
    userLogin(data.email, data.password)
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
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

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

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

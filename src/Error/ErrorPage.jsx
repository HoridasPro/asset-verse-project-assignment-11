import React from "react";
const ErrorPage = () => {
  return (
    <>
      <title>Error Page</title>
      <div className="relative w-96 h-96 border-8 border-red-600 rounded-full flex mx-auto items-center justify-center mt-20 animate-spin-slow shadow-lg shadow-red-300">
        <h1 className="absolute text-[70px] text-red-700 font-extrabold animate-bounce">
          404!
        </h1>
      </div>
      <h1 className="text-center text-5xl font-bold mt-10 animate-fadeIn">
        Not Found Page
      </h1>
      <p className="text-center text-xl font-normal text-black animate-pulse">
        Please try it again?
      </p>
      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 2.2s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default ErrorPage;

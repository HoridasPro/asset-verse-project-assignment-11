import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <FaLock className="text-6xl text-red-500 mb-4 animate-pulse" />

      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        403 - Forbidden 🚫
      </h1>

      <p className="text-gray-600 max-w-md">
        Sorry! You don’t have permission to access this page.
        <br />
        Please contact your administrator if you think this is a mistake.
      </p>
    </div>
  );
};

export default Forbidden;

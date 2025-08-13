import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Error404 = () => {

  document.title = "404 - Page Not Found";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      {/* Big 404 Text */}
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">404</h1>

      {/* Error Message */}
      <p className="text-2xl md:text-3xl font-semibold text-gray-700 mt-6">
        Oops! Page not found.
      </p>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Go Back Button */}
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition duration-300"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Go Back Home
      </Link>

      {/* Decorative Glow Circle */}
      <div className="absolute bottom-10 w-64 h-64 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      
    </div>
  );
};

export default Error404;

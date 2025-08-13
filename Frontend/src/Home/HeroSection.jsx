import heroImg from "../Img/heroImg.png"; // Replace with your image
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 border border-black">
        {/* Left Content */}
        <div className="flex flex-col justify-center items-center p-10">
          <span className="flex items-center gap-3 text-gray-500 tracking-wider text-sm uppercase">
            <span className="h-px w-10 bg-gray-400"></span>
            Our Bestsellers
          </span>

          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
            Latest <span className="font-semibold">Arrivals</span>
          </h1>

          <button className="group relative inline-flex items-center gap-3 text-sm font-semibold tracking-wide uppercase text-gray-900 hover:underline transition-all duration-300">
            <NavLink to="collections" className=''>Shop Now</NavLink>
            <span className="h-px w-10 bg-gray-400 group-hover:w-16 transition-all duration-300"></span>
          </button>
        </div>

        {/* Right Image */}
        <div className="flex items-center justify-center bg-[#ffdad6]">
          <img
            src={heroImg}
            alt="Latest Arrivals"
            className="object-cover drop-shadow-lg"      
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

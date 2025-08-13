import contactImage from "../Img/contactDemo.png"; // replace with your image path

const Contact = () => {

  document.title = "Contact Us - E-commerce App";
  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-semibold tracking-wide mb-12">
        <span className="border-b-2 border-black">CONTACT <span className="font-bold text-indigo-600">US</span></span>
      </h2>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-10 items-stretch">
        {/* Left Image */}
        <div className="md:w-1/2">
          <img
            src={contactImage}
            alt="Contact"
            className="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          />
        </div>

        {/* Right Info */}
        <div className="md:w-1/2 space-y-8 text-gray-700 flex flex-col justify-center">
          {/* Store Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Our Store
            </h3>
            <p className="leading-relaxed">54709 Willms Station</p>
            <p className="leading-relaxed">Suite 350, Washington, USA</p>
            <p className="leading-relaxed">Tel: (415) 555-0132</p>
            <p className="leading-relaxed">Email: admin@forever.com</p>
          </div>

          {/* Careers Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Careers at Forever
            </h3>
            <p className="leading-relaxed">
              Learn more about our teams and exciting job openings.
            </p>
            <button className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

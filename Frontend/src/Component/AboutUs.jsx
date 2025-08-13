import aboutDemo from "../Img/aboutDemo.png"

function AboutUs() {
    document.title = "About Us - E-commerce App";
    return (
        <section className="max-w-[1200px] mx-auto px-4 py-10">

            <h2 className="text-center text-3xl md:text-4xl font-semibold tracking-wide mb-12">
                <span className="border-b-2 border-black">ABOUT <span className="font-bold text-indigo-600">US</span></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <img
                        src={aboutDemo}
                        alt="About Us"
                        className="w-full max-w-[450px]: h-auto rounded-lg shadow"
                    />
                </div>

                <div className="text-gray-700 text-sm md:text-base leading-6">
                    <p className="mb-4 bg-gray-100 p-4 rounded-2xl">
                        Future Store was born out of a passion for innovation and a desire to
                        revolutionize the way people shop online. Our journey began with a
                        simple idea: to provide a platform where customers can easily discover,
                        explore, and purchase a wide range of products from the comfort of
                        their homes.
                    </p>
                    <p className="mb-4 bg-gray-100 p-4 rounded-2xl">
                        Since our inception, we’ve worked tirelessly to curate a diverse selection
                        of high-quality products that cater to every taste and preference. From
                        fashion and beauty to electronics and home essentials, we offer an
                        extensive collection sourced from trusted brands and suppliers.
                    </p>
                    <h3 className="font-bold mb-2">Our Mission</h3>
                    <p className="bg-gray-100 p-4 rounded-2xl">
                        Our mission at Future Store is to empower customers with choice,
                        convenience, and confidence. We’re dedicated to providing a seamless
                        shopping experience that exceeds expectations, from browsing and
                        ordering to delivery and beyond.
                    </p>
                </div>
            </div>

            <div className="mt-16">
                <h3 className="text-lg font-semibold mb-6">
                    <span className="text-gray-500">WHY</span> CHOOSE <span className="border-b-2 border-black">US</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 border rounded-lg overflow-hidden">
                    
                    <div className="border p-6">
                        <h4 className="font-semibold mb-2">Quality Assurance</h4>
                        <p className="text-sm text-gray-600">
                            We meticulously select and vet each product to ensure it meets our
                            stringent quality standards.
                        </p>
                    </div>

                    
                    <div className="border p-6">
                        <h4 className="font-semibold mb-2">Convenience</h4>
                        <p className="text-sm text-gray-600">
                            With our user-friendly interface and hassle-free ordering process,
                            shopping has never been easier.
                        </p>
                    </div>

                    
                    <div className="border p-6">
                        <h4 className="font-semibold mb-2">Exceptional Customer Service</h4>
                        <p className="text-sm text-gray-600">
                            Our team of dedicated professionals is here to assist you every step
                            of the way, ensuring your satisfaction is our top priority.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;

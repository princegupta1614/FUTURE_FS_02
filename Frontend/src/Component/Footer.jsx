import logo from "../Img/logo.png";

function Footer() {
    return (
        <footer className="bg-white text-gray-700 border-t">
            <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <div className="w-[130px] mb-4">
                        <img src={logo} alt="logo.png" />
                    </div>
                    <p className="text-sm leading-6">
                        Your one-stop destination for the latest trends, timeless styles,
                        and exclusive deals — crafted to bring fashion right to your doorstep.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-3">COMPANY</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Delivery</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-3">GET IN TOUCH</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="tel:8200225365">+91 8200225365</a></li>
                        <li><a href="mailto:princegupta7698@gmail.com">futurestore@gmail.com</a></li>
                        <li><a href="https://instagram.com/prince_gupta1614" target="_blank" className="hover:underline">Instagram</a></li>
                        <li><a href="https://www.linkedin.com/in/prince-gupta-32a91627b/" target="_blank" className="hover:underline">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t py-4 text-center text-sm text-gray-500">
                Copyright © {new Date().getFullYear()} Future Store - All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;

import { useState } from 'react';
import { toast } from 'react-toastify';

function NewsLetter() {
    const [email, setEmail] = useState('');

    const SubscribeNewsLetter = (e) => {
        e.preventDefault();
        // console.log(email);
        toast.success("Subscribed successfully");
    };

    return (
        <div className="w-full px-4 py-10 flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Subscribe now & get <span className="text-blue-600">20% off</span>
            </h2>
            <p className="text-gray-600 max-w-xl mb-6 text-sm md:text-base">
                Get exclusive updates, offers, and style tips delivered straight to your inbox.
            </p>

            <form
                onSubmit={SubscribeNewsLetter}
                className="flex flex-col sm:flex-row items-center w-full max-w-lg gap-3"
            >
                <input
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
}

export default NewsLetter;

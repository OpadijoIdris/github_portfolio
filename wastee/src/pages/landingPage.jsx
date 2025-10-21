import { Home, MapPin, Recycle, Gift, Trophy, Settings, LogIn } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const location = useLocation();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title)
    }
  }, [location]);

  return (
    <div className="flex min-h-screen bg-gray-50">
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-green-600 font-bold text-xl">
          WasteWise Nigeria
        </div>

        {/* Search */}
        <div className="flex-1 px-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <span className="text-gray-700 font-medium">₦0.00</span>
          <Link to={'/login'}>
            <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                <LogIn className="w-5 h-5 mr-2" /> Login
            </button>
          </Link>
        </div>
      </div>
    </header>
      

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16">
        {message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-5 mx-3" role="alert">
            <p>{message}</p>
          </div>
        )}
      

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 text-black">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 mb-6">
            <Recycle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            WasteWise Nigeria: Smarter Waste Management
          </h1>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Join our community in making waste management more efficient, sustainable, 
            and rewarding. Request collections, find recycling centers, and help keep Nigeria clean.
          </p>
          <div className="flex justify-between gap-3">
            <Link to={'/register'}>
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600">
                  Get Started
              </button>
            </Link>
            <Link to={'/illegalDumpingReport'}>
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600">
                  Report Waste
              </button>
            </Link>
          </div>
        </section>

        {/* Our Partners */}
        <section className="bg-gray-100 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Partners</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Lagos LGA", "RecycleNG", "GreenEarth", "UN SDG Hub"].map((partner) => (
              <div
                key={partner}
                className="bg-white shadow rounded-lg px-6 py-3 font-medium text-gray-700 hover:bg-green-50 cursor-pointer"
              >
                {partner}
              </div>
            ))}
          </div>
        </section>

        {/* Stay Updated */}
        <section className="bg-white py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Get the latest recycling tips, community events, and new features.
          </p>
          <form className="flex justify-center space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-lg w-80 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Subscribe
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="bg-green-600 text-white py-6 text-center">
          <div className="mb-4">
            <p className="font-semibold">Follow Us</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#"><FaFacebook className="w-6 h-6" /></a>
              <a href="#"><FaTwitter className="w-6 h-6" /></a>
              <a href="#"><FaInstagram className="w-6 h-6" /></a>
              <a href="#"><FaLinkedin className="w-6 h-6" /></a>
            </div>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} WasteWise Nigeria. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

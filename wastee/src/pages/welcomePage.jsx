import { FaBell, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import LoginPage from './loginPage';
import { Link } from 'react-router-dom';

const WasteWise = () => {
  

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col p-6 space-y-6">
        <div className="text-2xl font-bold">WasteWise</div>
        <nav className="flex flex-col space-y-4 text-sm">
          <a href="#" className="hover:text-green-200">Home</a>
          <a href="#" className="hover:text-green-200">Report Waste</a>
          <a href="#" className="hover:text-green-200">Collect Waste</a>
          <a href="#" className="hover:text-green-200">Rewards</a>
          <a href="#" className="hover:text-green-200">Leaderboard</a>
          <a href="#" className="hover:text-green-200">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
          <div className="flex items-center space-x-4">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="border-none outline-none bg-transparent text-sm"
            />
          </div>
          <div className="flex items-center space-x-6">
            <FaBell className="text-gray-600" />
             <Link to={'/login'}><button
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
              Login (₦0.000)
            </button>
            </Link> 
           
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-green-50">
          <div className="bg-green-600 text-white px-4 py-2 rounded-full mb-4">
            ♻️ WasteWise Nigeria
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Community Waste Management & Recycling
          </h1>
          <p className="max-w-2xl text-gray-700 mb-6">
            Join our mission to reduce pollution, improve public health, and create economic opportunities through responsible waste management.
          </p>

          <Link to={'/register'}>
          <button className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition">
            Get Started
          </button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 px-6 py-12 animate-bounce">
          {[
            {
              title: 'Request Waste Pickup',
              desc: 'Schedule pickups for general, recyclable, and organic waste.',
            },
            {
              title: 'Find Recycling Centers',
              desc: 'Locate nearby centers and learn what materials they accept.',
            },
            {
              title: 'Learn & Report',
              desc: 'Access educational resources and report illegal dumping.',
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4">
          &copy; 2025 WasteWise Nigeria. Built for Sustainable Cities & Responsible Consumption.
        </footer>

      </main>
    
    </div>
  );
};

export default WasteWise;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api.js';
import { Toaster, toast } from 'react-hot-toast';

const RegisterPage = () => {
  const [role, setRole] = useState('Houser');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('Male');
  const navigate = useNavigate();
  const notify = () => toast.success("signing up in progress ......")

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({
        name,
        email,
        password,
        phoneNumber: parseInt(phoneNumber, 10),
        location,
        role,
        gender,
      });

      const user = res.data;

      if (!user) {
        throw new Error('Registration failed: missing token or user');
      }

      console.log('registration successful', user);
      navigate('/login');
    } catch (error) {
      console.log('registration failed', error.response?.data?.message || error.message);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden transition-all duration-500">
        
        {/* Register Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleRegister}>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Houser">Houser</option>
              <option value="Collector">Collector</option>
            </select>

            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <button
            onClick={notify}
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-500 transition duration-700"
            >
              Register as {role}
            </button>
          </form>
        </div>

        {/* Login Redirect Section */}
        <div className="w-1/2 bg-green-700 hover:bg-green-800 transition duration-500 text-white p-10 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Already a Member?</h2>
          <p className="mb-6 text-center">Sign in to continue your journey with WasteWise</p>
          <a href="/login">
            <button className="bg-white text-green-700 px-6 py-2 rounded-md hover:bg-green-500 hover:text-white transition duration-700 shadow-lg shadow-green-400">
              LOGIN
            </button>
          </a>
        </div>
      </div>
      <Toaster position='top-center' />
    </div>
  );
};

export default RegisterPage;
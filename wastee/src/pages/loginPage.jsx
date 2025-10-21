import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api.js';
import {toast, Toaster} from 'react-hot-toast';

const LoginPage = () => {
  const [role, setRole] = useState('household');
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const navigate = useNavigate();

  const notify = () => toast.success('logging in process.....');


  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const res = await loginUser({email, password, role});
      const { user, token, Reward } = res;

      console.log("full response", res)

      if(!user || !token){
        console.log("invalid response structure")
      }
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", token)
      if(Reward) localStorage.setItem("Reward", Reward)
      // const reward = user?.Reward;
      
       console.log("na token be this", token)
      console.log("na reward be this", Reward)

      if(!token || !user){
        console.log("invalid respose structure")
        throw new Error ("invalid credentials")
      }
      

      console.log('login successful', user);

      if (user.role === 'Houser') {
        navigate('/household');
      } else if (user.role === 'Collector') {
        navigate('/collector');
      } else if (user.role === 'Community-admin') {
        navigate('/communityAdmin');
      }
    

    }catch(error){
      console.log('login failed', error.res?.data?.message || error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden transition-all duration-500">
        
        {/* Sign In Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Sign In</h2>
          <form className="space-y-4"
          onSubmit={handleLogin}
          >
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="household">Household / Individual</option>
              <option value="collector">Waste Collector / Recycler</option>
              <option value="communityAdmin">Community Admin / LGA</option>
              
            </select>

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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-green-600 hover:underline">Forgot Password?</a>
            </div>

            <button
            onClick={notify}
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-500 transition duration-700"
            >
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>
        </div>

        {/* Sign Up Section */}
        <div className="w-1/2 bg-green-700 hover:bg-green-800 transition duration-500 text-white p-10 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Hello, Welcome To WasteWise!</h2>
          <p className="mb-6 text-center">Join WasteWise and help build cleaner, smarter communities</p>
          <a href="/register">
            <button
            className="bg-white text-green-700 px-6 py-2 rounded-md hover:bg-green-500 hover:text-white transition duration-700 shadow-lg shadow-green-400">
              SIGN UP
            </button>
          </a>
        </div>
      </div>
      <Toaster position='top-center' />
    </div>
  );
};

export default LoginPage; 
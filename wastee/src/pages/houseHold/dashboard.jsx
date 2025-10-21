import { Recycle, LogOut } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaLeaf } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { 
        // getWasteId,
        getUser } from "../../api.js";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api.js";

export default function Dashboard() {

    const [reward, setReward] = useState(0);
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?._id;

        if (!userId) {
            console.error("No logged-in user found in localStorage");
            return;
        }

        // getWasteId(userId)
        //     .then((response) => {
        //         console.log("User-specific waste requests:", response.data);
        //         setRequests(response.data?.data || []);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching user's waste requests:", error);
        //     });

        getUser(userId)
            .then(response => {
                const userData = response.data;
                const user = userData.user || userData;
                if (user && user.Reward !== undefined) {
                    setReward(user.Reward);
                    localStorage.setItem("reward", user.Reward);
                    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
                    const updatedUser = { ...storedUser, ...user };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                }
            })
            .catch(error => {
                console.error("There was an error fetching the user's data!", error);
                const cachedReward = localStorage.getItem("reward");
                setReward(cachedReward ?? 0);
            });
    }, []);

    const handleLogout = async () => {
      try{
        await logoutUser();
        navigate('/')

      }catch(error){
        alert('for some reasons, could not LogOut')
      }
    }


    
  

  return (
    <div className="flex min-h-screen bg-gray-50">      

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg w-1/3 focus:outline-none"
          />
          <div className="flex items-center space-x-4">
            <span  className="text-green-600 flex  font-medium">Recycle point {reward ?? 0}< FaLeaf/></span>
            <button
            onClick={handleLogout}
             className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <LogOut className="w-5 h-5 mr-2" /> Sign Out
            </button>
          </div>
        </header>


        {/* My Waste Requests */}
        <section className="bg-white py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Waste Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Date </th>
                  <th className="py-2 px-4 border-b">Location</th>
                  <th className="py-2 px-4 border-b">Materials</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req._id}>
                    <td className="py-2 px-4 border-b">{new Date(req.requestDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{req.location}</td>
                    <td className="py-2 px-4 border-b">{req.materials.map(m => m.wasteType).join(', ')}</td>
                    <td className="py-2 px-4 border-b">{req.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Our Partners */}
        <section className="bg-gray-100 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Partners</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Lagos LGA", "RecycleNG", "GreenEarth", "UN SDG Hub"].map((partner) => (
              <div
                key={partner}
                className="bg-white shadow rounded-lg px-6 py-3 font-medium text-gray-700 hover:bg-green-50"
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
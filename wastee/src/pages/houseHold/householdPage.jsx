import { useState } from "react";
import { Home, MapPin, Recycle, Gift, Trophy, Settings, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import NewWasteRequest from "./newRequest";
import Dashboard from "./dashboard.jsx";


function UserDashboard() {


  
  const [isRequest, setIsRequest] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
              <div className="p-6 font-bold text-green-600 text-xl">
                WasteWise Nigeria
              </div>
              <nav className="flex-1 px-4 space-y-2">
                <a className="flex items-center p-2 text-gray-700 hover:bg-green-100 rounded-lg">
                  <Home className="w-5 h-5 mr-2" /> Home
                </a>
                <Link to={'/illegalDumpingReport'}>
                <a className="flex items-center p-2 text-gray-700 hover:bg-green-100 rounded-lg">
                  <MapPin className="w-5 h-5 mr-2" /> Report Illegal Dumping
                </a>
                </Link>
                <Link to={'/wasteRequest'}> 
                <a onClick={() => setIsRequest(true)} className="flex items-center p-2 text-gray-700 hover:bg-green-100 rounded-lg">
                  <Recycle className="w-5 h-5 mr-2" /> Request Waste Collection
                </a>
                </Link>
                <a className="flex items-center p-2 text-gray-700 hover:bg-green-100 rounded-lg">
                  <Gift className="w-5 h-5 mr-2" /> Rewards
                </a>
                
              </nav>
              <div className="p-4">
                <a className="flex items-center p-2 text-gray-700 hover:bg-green-100 rounded-lg">
                  <Settings className="w-5 h-5 mr-2" /> Settings
                </a>
              </div>
            </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
       <div>
         <Dashboard/>
       </div>
        
      </main>
    </div>
  );
}

export default UserDashboard;

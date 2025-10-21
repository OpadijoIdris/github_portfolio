import { Route, Routes, BrowserRouter } from 'react-router-dom'
import LandingPage from './pages/landingPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import UserDashboard from './pages/houseHold/householdPage.jsx' 
import CommunityAdmin from './pages/communityAdminPage.jsx'
import Subscribe from './pages/houseHold/subscribe.jsx'
import CollectorDashboard from './pages/collector/collectorDashboard.jsx'
import NewWasteRequest from './pages/houseHold/newRequest.jsx'
import IllegalDumpingForm from './pages/general/illegalDumping.jsx'

import {Cloudinary} from "@cloudinary/url-gen";


function App() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });
  

  return (
   
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/household' element={<UserDashboard />} />
      <Route path='/communityAdmin' element={<CommunityAdmin />} />
      <Route path='/subscribe' element={<Subscribe />} />
      <Route path='/collector' element={<CollectorDashboard />} />
      <Route path='/wasteRequest' element={<NewWasteRequest />} />
      <Route path='/illegalDumpingReport' element={<IllegalDumpingForm />} />

       
      




    </Routes>
    
    </BrowserRouter>

  )
}

export default App

import axios from "axios";

const API_BASE = 'http://localhost:3000';

export const loginUser = async (loginData) => {
    const response = await axios.post(`${API_BASE}/api/auth/login`, loginData);
    const token = response.data?.token;
    const user = response.data?.user;
    const reward = user?.Reward;
    // const reward = response.data.user.Reward
    // console.log("looking for reward", reward)


    if (user) {
  localStorage.setItem("user", JSON.stringify(user));
}


    if(reward){
        localStorage.setItem("reward", reward)
    }

    if (token) {
        localStorage.setItem("token", token);
    }else{
        console.log("i cant get token")
    }
    return {user, token, reward};
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE}/api/auth/logout`, {}, {
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};


// for my users alone
export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE}/api/users/${userId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const newWaste = (wasteData) => {
    const token = localStorage.getItem("token");
    return axios.post(`${API_BASE}/api/waste`, wasteData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

export const getWasteId = (userId) => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_BASE}/api/waste/${userId}`, userId, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};
// for my collectors alone 
export const acceptWasteRequest = (wasteId) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_BASE}/api/waste/accept`, { wasteId }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};


export const rejectWasteRequest = (wasteId, collectorAssayId, rejectionReason = "No reason provided") => {
    const token = localStorage.getItem("token");
    return axios.post(`${API_BASE}/api/waste/reject`, {wasteId, collectorAssayId, rejectionReason} , {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

// moti pari
export const getWasteRequests = () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_BASE}/api/waste`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

export const getIllegalDump = () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_BASE}/api/dump`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};
 




export const illegalDumping = (dumpData) => {
    const token = localStorage.getItem("token")
    const url = 'http://localhost:3000/api/dump';
    return axios.post(url, dumpData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

export const registerUser = (userData) => {
    const url = "http://localhost:3000/api/auth/register"
    return axios.post(url, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


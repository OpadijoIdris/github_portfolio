import RequestCard from './requestCard.jsx';
import CompletedList from './completedList.jsx';
import { useState, useEffect } from 'react';
import {
  acceptWasteRequest,
  rejectWasteRequest,
  getWasteRequests,
  // getIllegalDump
} from '../../api';


const HomeDashboard = ({ requestsCount }) => (
  <div>
    <h1 className="text-2xl font-bold mb-4">🚛 Collector Home</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700">Pending Waste Requests</h2>
        <p className="text-4xl font-bold mt-2">{requestsCount}</p>
      </div>
      {/* Can add more stats here */}
    </div>
    <p className="mt-6 text-gray-600">Welcome to your dashboard. Select an option from the sidebar to manage requests.</p>
  </div>
);

const WasteRequestsView = ({ requests, onAccept, onReject }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">📥 Incoming Waste Requests</h2>
    {requests.length > 0 ? (
      <div className="space-y-4">
        {requests.map(req => (
          <RequestCard key={req._id} request={req} onAccept={onAccept} onReject={onReject} />
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No new waste requests at the moment.</p>
    )}
  </div>
);

const IllegalDumpingView = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getIllegalDumpingReports()
      .then(response => {
        if (Array.isArray(response.data)) {
          setReports(response.data);
        } else {
          setError("Received unexpected data format.");
        }
      })
      .catch(err => {
        console.error("Error fetching illegal dumping reports:", err);
        setError("Failed to fetch reports. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading reports...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🏴 Illegal Dumping Reports</h2>
      {reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map(report => (
            <div key={report._id} className="bg-white p-6 rounded-lg shadow">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong className="font-semibold text-gray-800">Reported by:</strong> {report.user?.name || report.user?._id || 'Anonymous'}
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="font-semibold text-gray-800">Date:</strong> {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
              {report.images && <img src={report.images} alt="Illegal dump" className="w-full h-48 object-cover rounded-md mb-4" />}
              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p>{report.description || 'No description provided.'}</p>
              </div>

              {report.wasteType && (
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2">Waste Type</h3>
                  <p>{report.wasteType}</p>
                </div>
              )}

              {report.materials && report.materials.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2">Materials Reported</h3>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    {report.materials.map((material, index) => (
                      <li key={index}>
                        {material.quantity} {material.unit} of {material.wasteType}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No illegal dumping reports found.</p>
      )}
    </div>
  );
};

const AcceptedRequestsView = ({ accepted }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">✅ Accepted Requests</h2>
    <CompletedList completed={accepted} />
  </div>
);

const RejectedRequestsView = ({ rejected }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">❌ Rejected Requests</h2>
    {rejected.length > 0 ? (
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        {rejected.map(req => (
          <div key={req._id} className="border-b pb-2">
            <p><strong className="font-semibold">Request ID:</strong> {req._id}</p>
            {req.address && <p><strong className="font-semibold">Address:</strong> {req.address}</p>}
            {req.date && <p><strong className="font-semibold">Rejected on:</strong> {req.date}</p>}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No requests have been rejected.</p>
    )}
  </div>
);


const CollectorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [view, setView] = useState('home'); // home, waste, illegal, accepted, rejected

  useEffect(() => {
    getWasteRequests()
      .then(response => {
        if (Array.isArray(response.data)) {
          setRequests(response.data);
        } else {
          console.error("Expected an array of waste requests, but got:", response.data);
          setRequests([]);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the waste requests!", error);
        setRequests([]);
      });
  }, []);

  const handleAccept = (id) => {
  const collectorAssayId = JSON.parse(localStorage.getItem("user"))._id;
  acceptWasteRequest(id, collectorAssayId)
    .then(() => {
      const accepted = requests.find(r => r._id === id);
      if (accepted) {
        setAcceptedRequests(prev => [...prev, { ...accepted, date: new Date().toLocaleString() }]);
      }
      setRequests(prev => prev.filter(r => r._id !== id));
    })
    .catch(error => {
      console.error("❌ Error accepting waste request:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong");
    });
};



  const handleReject = (id) => {
  const collectorAssayId = JSON.parse(localStorage.getItem("user"))._id;
  rejectWasteRequest(id, collectorAssayId)
    .then(() => {
      const rejected = requests.find(r => r._id === id);
      if (rejected) {
        setRejectedRequests(prev => [...prev, { ...rejected, date: new Date().toLocaleString() }]);
      }
      setRequests(prev => prev.filter(r => r._id !== id));
    })
    .catch(error => {
      console.error("There was an error rejecting the waste request!", error.response?.data || error.message);
    });
};


  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeDashboard requestsCount={requests.length} />;
      case 'waste':
        return <WasteRequestsView requests={requests} onAccept={handleAccept} onReject={handleReject} />;
      case 'illegal':
        return <IllegalDumpingView />;
      case 'accepted':
        return <AcceptedRequestsView accepted={acceptedRequests} />;
      case 'rejected':
        return <RejectedRequestsView rejected={rejectedRequests} />;
      default:
        return <HomeDashboard requestsCount={requests.length} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col h-120">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Collector</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-3">
              <button onClick={() => setView('home')} className="w-full text-left p-2 rounded hover:bg-gray-700">Home</button>
            </li>
            <li className="mb-3">
              <button onClick={() => setView('waste')} className="w-full text-left p-2 rounded hover:bg-gray-700">Waste Requests</button>
            </li>
            <li className="mb-3">
              <button onClick={() => setView('illegal')} className="w-full text-left p-2 rounded hover:bg-gray-700">Illegal Dumping</button>
            </li>
            <li className="mb-3">
              <button onClick={() => setView('accepted')} className="w-full text-left p-2 rounded hover:bg-gray-700">Accepted Requests</button>
            </li>
            <li className="mb-3">
              <button onClick={() => setView('rejected')} className="w-full text-left p-2 rounded hover:bg-gray-700">Rejected Requests</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {renderView()}
      </main>
    </div>
  );
};

export default CollectorDashboard;
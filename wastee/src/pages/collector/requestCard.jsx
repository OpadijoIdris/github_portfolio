import { useState } from "react";

const RequestCard = ({ request, onAccept, onReject }) => {
  const [clicked, setClicked] = useState(false);

  const handleAccept = () => {
    setClicked(true);
    onAccept(request._id);
  };

  const handleReject = () => {
    setClicked(true);
    onReject(request._id);
  };

  return (
    <div className="border p-4 rounded shadow-md mb-4 bg-white">
      <h3 className="text-lg font-semibold">
        {request.materials.map(m => m.wasteType).join(', ')}
      </h3>
      <p><strong>Requester:</strong> {request.user?.name}</p>
      <p><strong>Location:</strong> {request.location}</p>
      <p><strong>Materials:</strong> {
        request.materials.map(m =>` ${m.quantity} ${m.unit} of ${m.wasteType}`).join(', ')
      }</p>
      <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={handleAccept}
          disabled={clicked}
          className={`text-white px-3 py-1 rounded ${clicked ? 'opacity-60 bg-green-400 font-semibold cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 cursor-pointer'}`}
        >
          {clicked ? "Accepted" : "Accept"}
        </button>

        <button
          onClick={handleReject}
          disabled={clicked}
          className={`text-white px-3 py-1 rounded ${clicked ? 'opacity-60 bg-red-400 font-semibold cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 cursor-pointer'}`}
        >
          {clicked ? "Rejected" : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
 function Dashboard (){
    return (
        <div>
        <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

        {/* Add / Edit Request */}
        <div className="flex mb-6">
          <input
            type="text"
            className="border px-3 py-2 mr-2 w-64"
            placeholder="Enter waste type (e.g. Plastic)"
            value={newRequest}
            onChange={(e) => setNewRequest(e.target.value)}
          />
          {editingId ? (
            <button
              onClick={updateRequest}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Request
            </button>
          ) : (
            <button
              onClick={addRequest}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Request
            </button>
          )}
        </div>

        {/* Requests Table */}
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3">#</th>
              <th className="p-3">Waste Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req.id} className="border-b">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{req.type}</td>
                <td className="p-3">{req.status}</td>
                <td className="p-3">
                  <button
                    onClick={() => editRequest(req.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRequest(req.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Report Illegal Dumping */}
        <div className="mt-8">
          <button className="bg-red-600 text-white px-6 py-3 rounded">
            Report Illegal Dumping
          </button>
        </div>

        </div>
    );
}

export default Dashboard;
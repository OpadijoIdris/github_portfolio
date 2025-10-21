import { useState } from "react";

const ReportDumping = () => {
  const [report, setReport] = useState({ location: '', description: '', photo: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setReport({ ...report, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Illegal dumping reported!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">🚨 Report Illegal Dumping</h2>
      <input type="text" name="location" placeholder="Location" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
      <input type="file" name="photo" onChange={handleChange} className="w-full mb-3" />
      <button type="submit" className="bg-red-600 hover:bg-red-700 transition duration-300 text-white px-4 py-2 rounded">Submit Report</button>
    </form>
  );
};

export default ReportDumping;
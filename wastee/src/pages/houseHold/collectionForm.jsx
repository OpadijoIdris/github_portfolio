// import { useState } from "react";

// const CollectionForm = () => {
//   const [form, setForm] = useState({
//     wasteType: '',
//     date: '',
//     time: '',
//     photo: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm({ ...form, [name]: files ? files[0] : value });
//   };
  
//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
//       <h2 className="text-xl font-bold mb-4">🗑️ Request Waste Collection</h2>
//       <select name="wasteType" onChange={handleChange} className="w-full mb-3 p-2 border rounded">
//         <option value="">Select Waste Type</option>
//         <option value="General">General</option>
//         <option value="Plastic">Plastic</option>
//         <option value="Organic">Organic</option>
//         <option value="E-waste">E-waste</option>
//       </select> 
//       <input type="date" name="date" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
//       <input type="time" name="time" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
//       <input type="file" name="photo" onChange={handleChange} className="w-full mb-3" />
//       <button type="submit" className="bg-green-600 hover:bg-green-700 transition duration-300 text-white px-4 py-2 rounded">Submit Request</button>
//     </form>
//   );
// };

// export default CollectionForm;
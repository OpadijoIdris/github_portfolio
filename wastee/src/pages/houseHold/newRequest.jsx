import { useState } from "react";
import { newWaste } from "../../api.js";
import { useNavigate } from "react-router-dom";

const NewWasteRequest = () => {
  const [wasteType, setWasteType] = useState("");
  const [kg, setKg] = useState("");
  const [quantity, setQuantity] = useState("")
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate()

  // Cloudinary configuration - PLEASE REPLACE WITH YOUR DETAILS
  // const CLOUDINARY_CLOUD_NAME = "dizz525li"; // TODO: Replace with your Cloudinary cloud name
  // const CLOUDINARY_UPLOAD_PRESET = "wastewise"; // TODO: Replace with your Cloudinary upload preset

  // const handleImageChange = async (e) => {
  //   const files = Array.from(e.target.files);
  //   const uploadedImageUrls = [];

  //   for (const file of files) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  //     try {
  //       const res = await fetch(
  //         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );
  //       const data = await res.json();
  //       console.log(data)
  //       uploadedImageUrls.push(data.secure_url);
  //     } catch (error) {
  //       console.error("❌ Cloudinary upload failed:", error);
  //       alert("Image upload failed. Please try again.");
  //     }
  //   }

  //   setImageUrls(uploadedImageUrls);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create materials array
      const materials = [
        {
          wasteType,
          quantity: kg,
          unit: "kg",
        },
      ];

      const wasteData = {
        materials,
        location,
        notes,
        status,
      };

      const res = await newWaste(wasteData);
      console.log("✅ New Waste Request Submitted:", res.data);
      alert("Waste request submitted successfully ✅");

      // Reset form
      setWasteType("");
      setKg("");
      setQuantity("")
      setLocation("");
      setNotes("");
      setStatus("Pending");
    } catch (error) {
      if (error.response) {
        console.error("❌ Submission failed:", error.response.data);
        alert(
          `Submission failed: ${error.response.data.message || "Unauthorized"}`
        );
      } else {
        console.error("❌ Error:", error.message);
        alert("Something went wrong. Please try again.");
      }
    }
    
  };
  // const success = handleSubmit()
  // if(success){
  //   navigate()
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          New Waste Request
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Waste Type */}
          <div>
            <label className="block font-medium mb-1">Waste Type</label>
            <select
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Waste Type</option>
              <option value="General">General</option>
              <option value="Paper">Paper</option>
              <option value="Plastic">Plastic</option>
              <option value="Glass">Glass</option>
              <option value="Metal">Metal</option>
              <option value="Organic">Organic</option>
              <option value="E-waste">E-waste</option>
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block font-medium mb-1">Weight (kg)</label>
            <input
              type="number"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter weight in kg"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value) }
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="how many are you dispossing"
            required
            
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter pickup location"
              required
            />
          </div>


          {/* Status */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="Pending">Pending</option>
              <option value="Collected">Collected</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Notes */}
          <div className="col-span-2">
            <label className="block font-medium mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Add extra details..."
              rows="3"
            ></textarea>
          </div>


          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewWasteRequest;

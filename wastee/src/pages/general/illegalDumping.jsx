import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { illegalDumping } from "../../api";
import { Toaster, toast } from "react-hot-toast";

const WASTE_TYPES = [
  "General",
  "Paper",
  "Plastic",
  "Glass",
  "Metal",
  "Organic",
  "E-waste",
];

const UNITS = ["kg", "g", "ton", "bags", "pieces"];

export default function IllegalDumpingForm() {

  const [form, setForm] = useState({
    reporter: "",
    location: "",
    wasteType: WASTE_TYPES[0],
    quantity: "",
    unit: UNITS[0],
    description: "",
    status: "Pending",
  });
  const navigate = useNavigate()
  const notify = toast.success


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  



  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?._id;

    const materials = [
    {
      dumpType: form.wasteType,
      quantity: parseFloat(form.quantity),
      unit: form.unit,
    },
  ];
  const payload = {
    userId,
    reporter: form.reporter,
    location: form.location,
    description: form.description,
    status: form.status,
    materials,
  };

    try{
      const response = await illegalDumping(payload);
      console.log("dumping report response:", response.data)

      if(response.data && response.data.success) {
        navigate("/")
      } else {
        console.log("report not saved", response.data?.message ||"unknown error")
      }
      console.log("Form submitted:", form);
    }catch (error) {
      console.log("submission failed", error.response?.data?.message || error.message
      )
    }

  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Report Illegal Dumping</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Reporter</label>
          <input
            name="reporter"
            value={form.reporter}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Your name or organisation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="enter the illegal waste location"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Waste Type</label>
            <select
              name="wasteType"
              value={form.wasteType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            >
              {WASTE_TYPES.map((wt) => (
                <option key={wt} value={wt}>
                  {wt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <div className="flex gap-2 mt-1">
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                type="number"
                min="0"
                step="any"
                required
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
                placeholder="Amount"
              />

              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Describe the situation (observations, hazards, etc.)"
          />
        </div>


        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          >
            <option value="Pending">Pending</option>
            <option value="InReview">InReview</option>
            <option value="Rejected">Rejected</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 bg-red-600 text-white hover:bg-green-red-700 focus:outline-none focus:ring focus:ring-green-200"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}

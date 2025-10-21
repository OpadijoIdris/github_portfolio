import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { illegalDumping } from '../api';

const ReportDumpingForm = () => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image); 
    formData.append('upload_preset', 'wastewise');
    formData.append('')

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dizz525li/image/upload', {
        method: 'POST',   
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      await illegalDumping({
        location,
        description,
        imageUrl,
      });

      navigate('/', { state: { message: 'Illegal dump reported successfully!' } });
    } catch (err) {
      setError(err.message || 'An error occurred while submitting the report.');
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 bg-white shadow-md rounded-md">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      <h2 className="text-2xl font-bold text-green-700 mb-6">Report Illegal Dumping</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location or address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the dumping situation"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800 transition"
        >
          Submit Report
        </button>
      </form>
    </section>
  );
};

export default ReportDumpingForm;

const multer = require('multer');
const { createWasteRequest } = require('./wasteService'); // Assuming your service is in wasteService.js

// Set up multer for image uploads
const storage = multer.memoryStorage(); // Store images in memory

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter }).array('images', 5); // Handle up to 5 images

// Your controller function
const createNewWaste = async (req, res) => {
  try {
    // Use the 'upload' middleware to handle FormData
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      // req.body will now contain the text fields
      // req.files will contain the uploaded images

      // 1. Parse the 'materials' field from JSON string to object
      const materials = JSON.parse(req.body.materials);

      // 2. Get the userId from the authenticated user (assuming you have auth middleware)
      const userId = req.user._id;

      // 3. Get the image paths (or buffers)
      const images = req.files.map(file => file.buffer.toString('base64')); // Or save to a cloud service and get URLs

      // 4. Construct the wasteData object for the service
      const wasteData = {
        ...req.body,
        materials,
        userId,
        images,
      };

      // 5. Call the service function
      const wasteRequest = await createWasteRequest(wasteData);

      // 6. Send the response
      res.status(201).json({
        success: true,
        message: 'Request successfully created',
        data: wasteRequest,
      });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createNewWaste,
};

/*
How to use this in your routes file (e.g., wasteRoutes.js):

const express = require('express');
const router = express.Router();
const { createNewWaste } = require('./wasteController');
const { protect } = require('./authMiddleware'); // Assuming you have an auth middleware

router.post('/', protect, createNewWaste);

module.exports = router;

*/

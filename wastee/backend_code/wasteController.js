const wasteService = require('./wasteService');

const deleteWasteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await wasteService.deleteWasteRequest(id);
    res.status(200).json({ message: 'Waste request deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  deleteWasteRequest
};

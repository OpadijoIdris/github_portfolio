import * as recyclingService from './recyclingService.js';

export const deleteRecyclingRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await recyclingService.deleteRecyclingRequest(id);
    res.status(200).json({ message: 'Recycling request deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

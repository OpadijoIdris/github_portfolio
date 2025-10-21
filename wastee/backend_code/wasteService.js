const Waste = require('./wasteModel');

const deleteWasteRequest = async (id) => {
  try {
    const deletedRequest = await Waste.findByIdAndDelete(id);
    if (!deletedRequest) {
      throw new Error('Waste request not found');
    }
    return deletedRequest;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  deleteWasteRequest
};

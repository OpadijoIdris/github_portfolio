import Recycling from './recyclingModel.js';

export const deleteRecyclingRequest = async (id) => {
  try {
    const deletedRequest = await Recycling.findByIdAndDelete(id);
    if (!deletedRequest) {
      throw new Error('Recycling request not found');
    }
    return deletedRequest;
  } catch (error) {
    throw new Error(error.message);
  }
};

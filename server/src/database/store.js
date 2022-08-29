const StoreEntry = require('../models/StoreEntry');
const customError = require('../utils/customError');

const createStore = async (store) => {
    try {
        const storeEntry = new StoreEntry(store);
        const createdStoreEntry = await storeEntry.save();
        return createdStoreEntry;
    } catch(error) {
        throw error;
    }
}

const getStoreById = async (id) => {
    try {
        const store = await StoreEntry.findOne({ _id: id });
        // if (store === null) throw customError("store not found", "NotFound");
        return store;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createStore,
    getStoreById
};
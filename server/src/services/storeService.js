const store = require('../database/store');


const createStore = async (storeData) => {
    try {
        const createdStore = await store.createStore(storeData);
        return createdStore;
    } catch(error) {
        throw error;
    }
}

const getStoreById = async (id)  => {
    try {

        const getStoreById = await store.getStoreById(id)
        return getStoreById;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createStore,
    getStoreById
}
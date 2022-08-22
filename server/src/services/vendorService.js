const vendor = require('../database/vendor');

const createVendor = async (user) => {
    try {
        
    } catch {

    }
}

const updateVendor = async (id, data) => {
    try {
        const updatedVendor = await vendor.updateVendor(id, data);
        return updatedVendor;
    } catch(error) {
        throw error;
    }
}

const getVendorByUserId = async (id) => {
    try {
        const foundVendor = await vendor.getVendorByUserId(id);
        return foundVendor;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createVendor,
    updateVendor,
    getVendorByUserId
}
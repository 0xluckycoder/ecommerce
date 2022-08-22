const VendorEntry = require('../models/VendorEntry');
const customError = require('../utils/customError');

const createVendor = async (vendor) => {
    try {
        const vendorEntry = new VendorEntry(vendor);
        const createdVendorEntry = await vendorEntry.save();
        return createdVendorEntry;
    } catch(error) {
        throw error;
    }
}

const getVendorByUserId = async (id) => {
    try {
        const vendor = await VendorEntry.findOne({ cognitoId: id });
        if (vendor === null) throw customError("user not found", "NotFound");
        return vendor;
    } catch (error) {
        throw error;
    }
}

const updateVendor = async (id, data) => {
    try {
        const vendorEntry = await VendorEntry.updateOne({ id }, { ...data });
        return vendorEntry;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createVendor,
    updateVendor,
    getVendorByUserId
};
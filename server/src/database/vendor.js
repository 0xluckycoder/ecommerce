const VendorEntry = require('../models/VendorEntry');

const createVendor = async (vendor) => {
    try {
        const vendorEntry = new VendorEntry(vendor);
        const createdVendorEntry = await vendorEntry.save();
        return createdVendorEntry;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createVendor
};
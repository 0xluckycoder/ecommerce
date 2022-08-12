const mongoose = require('mongoose');
const { Schema } = mongoose;

const buyerEntrySchema = new Schema({
    cognitoId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    storeId: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    onlineStatus: {
        type: String
    },
    totalSpent: {
        type: String
    },
    totalOrders: {
        type: String
    }
});

const VendorEntry = mongoose.model('BuyerEntry', buyerEntrySchema);

module.exports = VendorEntry;
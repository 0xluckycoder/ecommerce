const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorEntrySchema = new Schema({
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
  }
});

const VendorEntry = mongoose.model('VendorEntry', vendorEntrySchema);

module.exports = VendorEntry;
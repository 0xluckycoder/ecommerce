const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorEntrySchema = new Schema({

});

// storeName: {
//     type: String,
//     required: true
// },
// logo: {
//     type: String
// },
// banner : {
//     type: String
// },
// storeStatus: {
//     type: Boolean,
//     required: true,
//     default: true
// },
// storeOwner: {
//     type: String,
//     required: true,
// }

const VendorEntry = mongoose.model('VendorEntry', vendorEntrySchema);

module.exports = VendorEntry;

/*
const userSchema = new Schema({ name: String }, {
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
});
*/ 
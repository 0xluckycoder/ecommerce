const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeEntrySchema = new Schema({
    storeName: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    banner : {
        type: String
    },
    storeStatus: {
        type: Boolean,
        required: true,
        default: true
    },
    // store is already linked to vendor with one to one relationship in his object field storeId
    // ownerId: {
    //     type: String,
    //     required: true,
    // },
    userStatus: {
        type: String,
        required: true
    }
});

const StoreEntry = mongoose.model('StoreEntry', storeEntrySchema);

module.exports = StoreEntry;

/*
const userSchema = new Schema({ name: String }, {
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
});
*/ 
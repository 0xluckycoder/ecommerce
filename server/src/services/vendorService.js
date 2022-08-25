const vendor = require('../database/vendor');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const customError = require('../utils/customError');

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

const uploadLogo = async (file, userId) => {
    try {

        const supportedFormats = [
            "image/jpeg",
            "image/png"
        ];

        if (file.size > 1000000) throw customError('invalid file size', 'ValidationFailed')
        
        const isSupported = supportedFormats.some(item => item === file.mimetype);
        if (!isSupported) throw customError('invalid file format', 'ValidationFailed');

        const uploadedImagePath = path.resolve(file.path);

        // remove current ext and return filename without ext
        const fileNameArray = file.filename.split('.');
        fileNameArray.pop();
        const fileNameWithoutExt = fileNameArray.join('');

        const uploadDestination = path.resolve('src/images/destination', fileNameWithoutExt);

        // compress & upload image as .webp
        const data = await sharp(uploadedImagePath)
                            .webp({ lossless: false })
                            .toFile(`${uploadDestination}.webp`);

        // remove initially uploaded image
        fs.unlinkSync(file.path);

        console.log(data);

        /*
            - read more about pricing
            - upload processed image to s3 (PutObjectCommand)
            - return the public url to client
        */ 

     } catch(error) {
        throw error;
    }
}

module.exports = {
    createVendor,
    updateVendor,
    getVendorByUserId,
    uploadLogo
}
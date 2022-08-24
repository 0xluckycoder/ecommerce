const vendor = require('../database/vendor');
const sharp = require('sharp');
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

        if (file.size > 1000000) throw customError('invalid file size', 'ValidationFailed')

        /*
            - configure multer to upload original image size wihout compressing
            - upload the original image size and validate it
            - crop and compress the image with sharp.js
            - upload processed image to s3 (PutObjectCommand)
                - read more about pricing
            - return the public url to client
        */ 
        // const image = await sharp(file.path).toBuffer((error, data, info) => {
        //     if (error) throw error;
        //     console.log(info.size / 1000, 'kb');
        // });
        // const image = await sharp(file.path).toFormat(error, );

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
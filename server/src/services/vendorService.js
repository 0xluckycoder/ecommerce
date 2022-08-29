const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { 
    S3Client, 
    PutObjectCommand
} = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

const customError = require('../utils/customError');
const vendor = require('../database/vendor');

// single image upload helper function
const uploadImage = async (file) => {
    try {

        const supportedFormats = [
            "image/jpeg",
            "image/png"
        ];

        // validate image size
        if (file.size > 1000000) throw customError('invalid file size', 'ValidationFailed')
        
        // validate image format
        const isSupported = supportedFormats.some(item => item === file.mimetype);
        if (!isSupported) throw customError('invalid file format', 'ValidationFailed');

        const uploadedImagePath = path.resolve(file.path);

        // remove current ext and return filename without ext
        const fileNameArray = file.filename.split('.');
        fileNameArray.pop();
        const fileNameWithoutExt = fileNameArray.join('');

        const uploadDestination = path.resolve('src/images', fileNameWithoutExt);

        // compress & upload image as .webp
        await sharp(uploadedImagePath).webp({ lossless: false }).toFile(`${uploadDestination}.webp`);

        // remove cache uploaded images
        fs.unlinkSync(file.path);

        // generate unique name for the image
        const uniqueFileName = uuidv4();

        // upload image to s3
        const client = new S3Client({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });
        const fileStream = fs.createReadStream(`${uploadDestination}.webp`);
        const putObjectCommand = new PutObjectCommand({
            Body: fileStream,
            Key: `${uniqueFileName}.webp`,
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            ACL: "public-read"
        });
        const putObjectCommandResponse = await client.send(putObjectCommand);
        console.log('uploaded', putObjectCommandResponse);

        // delete .webp converted image from server
        fs.unlinkSync(`src/images/${fileNameWithoutExt}.webp`);

        const uploadedImageUrl = `https://freebieuploads.s3.us-west-2.amazonaws.com/${uniqueFileName}.webp`;
        return uploadedImageUrl;

     } catch(error) {
        throw error;
    }
}

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

const getVendorByUserId = async (subId) => {
    try {
        const foundVendor = await vendor.getVendorByUserId(subId);
        return foundVendor;
    } catch(error) {
        throw error;
    }
}

const uploadLogo = async (file) => {
    try {
        const uploadImageResponse = await uploadImage(file);
        return uploadImageResponse;
    } catch(error) {
        throw error;
    }
}

const uploadBanner = async (file) => {
    try {
        const uploadImageResponse = await uploadImage(file);
        return uploadImageResponse;
    } catch(error) {
        throw error;
    }
}

/*
- read more about pricing
- complete attribute upload feature
- restructure notes and start planning

- remove destination image
- architecture the api workflow for upload attributes / images / logos
*/ 


module.exports = {
    createVendor,
    updateVendor,
    getVendorByUserId,
    uploadLogo,
    uploadBanner
}
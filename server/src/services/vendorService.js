const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const customError = require('../utils/customError');
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
        
        // console.log(data);

        const client = new S3Client({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        const fileStream = fs.createReadStream(`${uploadDestination}.webp`);

        // console.log('🔥', `${uploadDestination}.webp`);
        // console.log(fileStream);

        const putObjectCommand = new PutObjectCommand({
            Body: fileStream,
            Key: `${fileNameWithoutExt}.webp`,
            Bucket: process.env.AWS_S3_BUCKET_NAME
        });

        const putObjectCommandResponse = await client.send(putObjectCommand);

        console.log(putObjectCommandResponse);

        /*
        arn:aws:s3:::freebiemedia
        https://freebiemedia.s3.ap-south-1.amazonaws.com/33a5a4adf5f57c15be701e9a3d28717e221d791d.jpg
        const parallellUploads = new Upload({
        client: new S3Client({
            credentials: {
            accessKeyId: process.env.S3_KEY,
            secretAccessKey: process.env.S3_SECRET,
            },
            region: process.env.S3_REGION,
            endpoint: "http://us-east-1.linodeobjects.com",
        }),
        params: {
            Bucket: process.env.S3_BUCKET,
            Key: "gauntlet_" + uuid() + "_" + files.files.name,
            Body: fs.createReadStream(files.files.path),
        },
        });

        parallellUploads.on("httpUploadProgress", (progress) => {
        console.log(progress);
        });

        await parallellUploads.done();
        */ 

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
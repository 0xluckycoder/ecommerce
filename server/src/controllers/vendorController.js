const yup = require('yup');
const vendorService = require('../services/vendorService');
const customError = require('../utils/customError');
// add auhtorization middleware for private api endpoints

const createVendor = async (req, res, next) => {
    try {
        // validate user input
        const userSchema = yup.object().shape({
            firstName: yup.string('firstname must be a string')
                        .required('firstname is required')
                        .max(127, 'firstname is too long')
                        .min(3, 'firstname is too short'),
            lastName: yup.string('lastname must be a string')
                        .required('lastname is required')
                        .max(127, 'lastname is too long')
                        .min(3, 'lastname is too short'),
            phone: yup.string('phone must be a string')
                        .max(20, 'phone number is too long')
                        .min(7, 'phone number is too short'),
            country: yup.string('country name must be a string')
                        .max(56, 'country name is too long')
                        .min(3, 'country name is too short'),
            city: yup.string('city name must be a string')
                        .max(56, 'city name is too long')
                        .min(3, 'city name is too short')
        });

        const validated = await userSchema.validate(req.body);
        const createVendorResponse = await vendorService.createVendor(validated);

        res.status(200).json({
            success: true,
            data: createVendorResponse
        });

    } catch(error) {
        next(error);
    }
}

const updateVendor = async (req, res, next) => {
    try {
        // only available fields will be updated, other fields will stay the same
        // create a workflow for testing and developemnt
        // validate available fields

        const { id } = req.params;

        // vendor schema
        const vendorSchema = yup.object().shape({
            firstName: yup.string('firstname must be a string')
                        .max(127, 'firstname is too long')
                        .min(3, 'firstname is too short'),
            lastName: yup.string('lastname must be a string')
                        .max(127, 'lastname is too long')
                        .min(3, 'lastname is too short'),
            phone: yup.string('phone must be a string')
                        .max(20, 'phone number is too long')
                        .min(7, 'phone number is too short'),
            country: yup.string('country name must be a string')
                        .max(56, 'country name is too long')
                        .min(3, 'country name is too short'),
            city: yup.string('city name must be a string')
                        .max(56, 'city name is too long')
                        .min(3, 'city name is too short')
        });

        const validated = await vendorSchema.validate(req.body);
        const updateVendorResponse = await vendorService.updateVendor(id, validated);

        res.status(200).json({
            success: true,
            data: updateVendorResponse
        });        
    } catch(error) {
        next(error);
    }
}

const getVendorByUserId = async (req, res, next) => {
    try {

        console.log('🔥', req.userData);

        console.log(req.data);

        const { id } = req.params;
        const getVendorResponse = await vendorService.getVendorByUserId(id);

        res.status(200).json({
            success: true,
            data: getVendorResponse
        });
    } catch(error) {
        next(error);
    }
}


const uploadLogo = async (req, res, next) => {
    try {
        const { file } = req;

        if (!file) throw customError('request validation failed', 'ValidationFailed');

        const uploadLogoResponse = await vendorService.uploadLogo(file);

        res.status(200).json({
            success: true,
            data: uploadLogoResponse
        });
    } catch(error) {
        next(error);
    }
}

const uploadBanner = async (req, res, next) => {
    try {
        const { file } = req;

        if (!file) throw customError('request validation failed', 'ValidationFailed');

        const uploadBannerResponse = await vendorService.uploadBanner(file);

        res.status(200).json({
            success: true,
            data: uploadBannerResponse
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    createVendor,
    getVendorByUserId,
    updateVendor,
    uploadLogo,
    uploadBanner
}
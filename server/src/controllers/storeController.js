const yup = require('yup');
const storeService = require('../services/storeService');
const customError = require('../utils/customError');

const createStore = async (req, res, next) => {
    try {

        const { subId } = req.userData;
        console.log('🔥', subId);

        // store schema
        const storeSchema = yup.object().shape({
            storeName: yup.string('storename must be a string')
                            .max(127, 'storename is too long')
                            .min(3, 'storename is too short'),
            logo: yup.string('logo must be a string')
                        .max(300, 'logo is too long')
                        .min(3, 'logo is too short'),
            banner: yup.string('logo must be a string')
                        .max(300, 'logo is too long')
                        .min(3, 'logo is too short'),
        });

        const validated = await storeSchema.validate(req.body);
        const createdStoreResponse = await storeService.createStore(validated);

        res.status(200).json({
            success: true,
            data: createdStoreResponse
        });

    } catch(error) {
        next(error);
    }
}

const getStoreById = async (req, res, next) => {
    try {
        const { id } = req.params;

        console.log(id);

        // const { subId } = req.userData;
        // console.log('🔥', subId);

        const getStoreResponse = await storeService.getStoreById(id);

        res.status(200).json({
            success: true,
            data: getStoreResponse
        });

    } catch(error) {
        next(error);
    }
}

module.exports = {
    createStore,
    getStoreById
}
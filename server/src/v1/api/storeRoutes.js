const { Router } = require('express');
const storeController = require('../../controllers/storeController');
const {
    authorizeRequest
} = require('../../middlewares');

const router = Router();

router.post('/' , authorizeRequest, storeController.createStore);

router.get('/:id', authorizeRequest, storeController.getStoreById);

module.exports = router;
const { Router } = require('express');
const vendorController = require('../../controllers/vendorController');

const router = Router();

router.post('/', vendorController.createVendor);

router.get('/user/:id', vendorController.getVendorByUserId);

router.put('/:id', vendorController.updateVendor);

module.exports = router;
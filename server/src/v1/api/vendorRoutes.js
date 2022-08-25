const { Router } = require('express');
const vendorController = require('../../controllers/vendorController');
const multer = require('multer');

const router = Router();

// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ 
    storage: storage,
    limits: 1000000
});

router.post('/', vendorController.createVendor);

router.get('/user/:id', vendorController.getVendorByUserId);

router.put('/:id', vendorController.updateVendor);

router.post('/logo', upload.single('logo'), vendorController.uploadLogo);

module.exports = router;
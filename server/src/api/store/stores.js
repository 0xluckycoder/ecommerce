const { Router } = require('express');

const router = Router();

const StoreEntry = require('../../models/StoreEntry');

router.get('/', async (req, res, next) => {
    try {
        const entries = await StoreEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const storeEntry = new StoreEntry(req.body);
        const createdEntry = await storeEntry.save();
        res.json(createdEntry);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

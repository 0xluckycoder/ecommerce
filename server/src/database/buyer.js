const BuyerEntry = require('../models/BuyerEntry');

const createBuyer = async (buyer) => {
    try {
        const buyerEntry = new BuyerEntry(buyer);
        const createdBuyerEntry = buyerEntry.save();
        return createdBuyerEntry;

    } catch(error) {
        throw error;
    }
}

module.exports = {
    createBuyer
}
const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({ 
        include: [ Product, Image ], 
        where: { userId: req.user.id } 
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { productId, quantity } = req.body;
    const result = await Purchase.create({
        productId,
        quantity,
        userId: req.user.id,
    });
    return res.status(201).json(result);
});

module.exports = {
    getAll,
    create,
}
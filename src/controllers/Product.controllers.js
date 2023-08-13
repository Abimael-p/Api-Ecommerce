const catchError = require('../utils/catchError');
const Sequelize = require('sequelize');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Image = require('../models/Image');

const getAll = catchError(async (req, res) => {
    const { title, categoryId } = req.query;
    let filters = {}; 

    if (title !== undefined ) {
        if (title !== ""){
            filters.title = { [Sequelize.Op.iLike]: `%${title}%` };
        }
    }
    if (categoryId !== undefined && categoryId !== '' ) {
        if (Array.isArray(categoryId)) {
            filters.categoryId = { [Sequelize.Op.in]: categoryId };
        } else {
            filters.categoryId = categoryId;
        }
    }
    if (Object.keys(filters).length === 0) {
        const allProducts = await Product.findAll({ include: [Category, Image] });
        return res.json(allProducts);
    }

    const filteredProducts = await Product.findAll({
        where: filters,
        include: [Category, Image],
    });

    return res.json(filteredProducts);
});


const create = catchError(async(req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id, {include: [Image, Category]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setProductImages = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product) return res.status(404).json({ message: "news not found" });
    await product.setImages(req.body);
    const images = await product.getImages();
    return res.json(images);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setProductImages,
}
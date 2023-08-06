const express = require('express');
const userRouter = require('./User.router');
const categoryRouter = require('./Category.router');
const productRouter = require('./Product.router')
const cartRouter = require('./Cart.router')
const imageRouter = require('./Image.router');
const purchaseRouter = require('./Purchase.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter);

router.use("/categories", categoryRouter);

router.use("/products", productRouter);

router.use("/product_images", imageRouter);

router.use("/cart", cartRouter);

router.use("/purchases", purchaseRouter);


module.exports = router;
const { getAll, create } = require("../controllers/Purchase.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");

const purchaseRouter = express.Router();

purchaseRouter.route("/")
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

module.exports = purchaseRouter;

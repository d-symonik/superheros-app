const {Router} = require('express');
const router = Router();

const {superheroRouter} = require("./superheroRouter");
const {superpowerRouter} = require('./superpowerRouter');
const {superheroImagesRouter} = require("./superheroImagesRouter");

router.use('/superheroes', superheroRouter);
router.use('/superpowers', superpowerRouter);
router.use('/images', superheroImagesRouter);

module.exports = router;

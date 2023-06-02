const {Router} = require('express');
const router = Router();

const {superheroRouter} = require("./superheroRouter");
const {superpowerRouter} = require('./superpowerRouter');

router.use('/superheroes', superheroRouter);
router.use('/superpowers', superpowerRouter);

module.exports = router;

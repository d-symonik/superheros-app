const {Router} = require('express');
const router = Router();

const {superheroRouter} = require("./superheroRouter");

router.use('/superheroes', superheroRouter);

module.exports = router;

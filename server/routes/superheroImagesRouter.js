const {Router} = require('express');
const router = Router();
const superheroImagesController = require('../controllers/superheroImagesController');

router.post('/:superheroId', superheroImagesController.add);
router.delete('/:id', superheroImagesController.remove);


module.exports = {superheroImagesRouter: router}

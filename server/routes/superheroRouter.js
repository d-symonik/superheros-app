const {Router} = require('express');
const router = Router();
const superheroController = require('../controllers/superheroController');

router.get('/',superheroController.getAll);
router.get('/:id',superheroController.getById);
router.post('/', superheroController.create);
router.delete('/:id', superheroController.remove);
// router.patch('/:id', superheroController.update);

module.exports = {superheroRouter: router}

const {Router} = require('express');
const router = Router();
const superpowerController = require('../controllers/superpowerController');

router.post('/:superheroId', superpowerController.add);
router.delete('/:id', superpowerController.remove);
router.patch('/:id', superpowerController.update);


module.exports = {superpowerRouter: router}

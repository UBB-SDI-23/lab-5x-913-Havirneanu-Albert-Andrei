const express = require('express');
const Controller = require('../controllers/food_brand_controller');
const router = express.Router();

router.get('/', Controller.getAll);
router.get('/:id', Controller.getById);
router.post('/', Controller.add);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.remove);
router.post('/addCat/:catId/:foodBrandId', Controller.addCat);

module.exports = router;
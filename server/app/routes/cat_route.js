const express = require('express');
const Controller = require('../controllers/cat_controller');
const router = express.Router();

router.get('/' , Controller.getAll);
router.get('/:id', Controller.getById);
router.post('/', Controller.add);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.remove);
router.post('/addOwner/:catId/:ownerId', Controller.addOwner);
router.post('/addFoodBrand/:catId/:foodBrandId', Controller.addFoodBrand);
router.get('/raport/getRaport', Controller.raport);
router.get('/raport/getRaport2', Controller.raport2);

module.exports = router;
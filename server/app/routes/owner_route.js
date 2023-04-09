const express = require('express');
const Controller = require('../controllers/owner_controller');
const router = express.Router();

router.get('/', Controller.getAll);
router.get('/:id', Controller.getById);
router.post('/', Controller.add);
router.delete('/:id', Controller.remove);
router.put('/:id', Controller.update);
router.get('/filter/:age', Controller.filterByAge);
router.post('/addCat/:catId/:ownerId', Controller.addCat);
router.post('/addAddress/:ownerId/:addressId', Controller.addAddress);

module.exports = router;
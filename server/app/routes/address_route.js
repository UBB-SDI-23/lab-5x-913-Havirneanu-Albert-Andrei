const express = require('express');
const Controller = require('../controllers/address_controller');
const router = express.Router();

router.get('/', Controller.getAll);
router.get('/:id', Controller.getById);
router.post('/', Controller.add);
router.delete('/:id', Controller.remove);
router.put('/:id', Controller.update);
router.post('/addOwner/:ownerId/:addressId', Controller.addOwner);

module.exports = router;
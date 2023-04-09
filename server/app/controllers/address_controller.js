const Service = require('../services/address_service');
const Address = require('../models/address_model');

module.exports = {
    getAll, 
    add,
    getById,
    remove, 
    update,
    addOwner
}

async function getAll(_, res) {
    try {
        const addresses = await Service.getAll();
        return res.status(200).json(addresses);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
}

async function add(req, res) {
   try {
        const addedAddress = await Service.add(req.body);
        return res.status(200).json(addedAddress);
   } catch(error) {
        return res.status(500).json({error: error.message});
   }
}

async function getById(req, res) {
   try {
        const {id} = req.params;
        const foundAddress = await Service.getById(id);
        if (!foundAddress) {
            return res.status(404).json({message:`no address with id ${id}`});
        }
        return res.status(200).json(foundAddress);
   } catch(error) {
        return res.status(500).json({message: error.message});
   }
}

async function remove(req, res) {
   try {
        const {id} = req.params;
        const wasRemoved = await Service.remove(id);
        if (!wasRemoved) {
            return res.status(404).json({message: `no address with id ${id}`});
        }
        return res.status(200).json({message: `address with id ${id} was removed succesfullu`});
   }catch(error) {
        return res.status(500).json({error: error.message});
   } 
}

async function update(req, res) {
   try {
        const {id} = req.params;
        const params = req.body;
        const wasUpdated = await Service.update(id, params);
        if (!wasUpdated) {
            return res.status(404).json({message: `no address with id ${id}`});
        }
        return res.status(200).json(await Address.findById(id));
   } catch(error) {
        return res.status(500).json({error: error.message});
   }
}

async function addOwner(req, res) {
    try {
          const {ownerId} = req.params;
          const {addressId} = req.params;
          const address = await Service.addOwner(ownerId, addressId);
          return res.status(200).json(address);
    } catch(error) {
          return res.status(500).json({message: error.message});
    }
}









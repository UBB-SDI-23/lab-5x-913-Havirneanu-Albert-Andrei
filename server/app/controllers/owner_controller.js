const Owner = require('../models/owner_model');
const Service = require('../services/owner_service');

module.exports = {
    getAll,
    add,
    getById,
    remove,
    update,
    filterByAge,
    addCat,
    addAddress
}

async function getAll(_, res) {
    try {
        const owners = await Service.getAll();
        return res.status(200).json(owners);
    }catch(error) {
        return res.status(500).json({message: error.message});
    }
}

async function add(req, res) {
    try {
        const addedOwner = await Service.add(req.body);
        return res.status(200).json(addedOwner);
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

async function getById(req, res) {
    try {
        const {id} = req.params;
        const foundOwner = await Service.getById(id);
        if (!foundOwner) {
            return res.status(404).json({message: `no owner with id ${id}`});
        }
        return res.status(200).json(foundOwner);
    } catch (error) {
       return res.status(500).json({error: error.message});
    }
} 

async function remove(req, res) {
   try {
        const {id} = req.params;
        const wasRemoved = await Service.remove(id);
        if (!wasRemoved) {
            return res.status(404).json({message: `no owner with id ${id}`});
        }
        return res.status(200).json({message:`owner with id ${id} was removed succesfully`});
   } catch (error) {
        return res.status(500).json({error: error.message});
   } 
}

async function update(req, res) {
    try {
        const {id} = req.params;
        const params = req.body;
        const wasUpdated = await Service.update(id, params);
        if (!wasUpdated) {
            return res.status(404).json({message:`no owner with id ${id}`});
        }
        return res.status(200).json(await Owner.findById(id));
    }catch(error) {
        return res.status(500).json({error: error.message});
    }
}


async function filterByAge(req, res) {
   try {
        const {age} = req.params;
        console.log(age);
        const owners = await Service.filterByAge(age);
        return res.status(200).json(owners);
   } catch (error) {
        return res.status(500).json({error: error.message});
   } 
}

async function addCat(req, res) {
   try {
        const {catId} = req.params;
        const {ownerId} = req.params;
        const owner = await Service.addCat(ownerId, catId);
        return res.status(200).json(owner);
   } catch (error) {
        return res.status(500).json({message: error.message});
   } 
}

async function addAddress(req, res) {
    try {
        const {ownerId} = req.params;
        const {addressId} = req.params;
        const owner = await Service.addAddress(ownerId, addressId);
        return res.status(200).json(owner);
    }catch(error) {
        return res.status(500).json({message: error.message});
    }
}
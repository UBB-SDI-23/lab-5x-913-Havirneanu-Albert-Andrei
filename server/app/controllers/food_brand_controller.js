const Service = require('../services/food_brand_service');
const FoodBrand = require('../models/food_brand_model');

module.exports = {
    getAll, 
    add,
    getById,
    remove, 
    update,
    addCat,
}


async function getAll(_, res) {
   try {
        const foodBrands = await Service.getAll();
        return res.status(200).json(foodBrands);
   } catch (error) {
        return res.status(500).json({message: error.message});
   } 
}

async function add(req, res) {
   try {
        const addedFoodBrand = await Service.add(req.body);
        return res.status(200).json(addedFoodBrand);
   }catch(error) {
        return res.status(500).json({error: error.message});
   } 
}

async function getById(req, res) {
   try {
        const {id} = req.params;
        const foundFoodBrand = await Service.getById(id);
        if (!foundFoodBrand) {
            return res.status(404).json({message: `no food brand with id ${id}`});
        }
        return res.status(200).json(foundFoodBrand);
   } catch (error) {
        return res.status(500).json({error: error.message});
   } 
}

async function remove(req, res) {
   try {
        const {id} = req.params;
        const wasRemoved = await Service.remove(id);
        if (!wasRemoved) {
            return res.status(404).json({message: `no foodbrand with id ${id}`});
        }
        return res.status(200).json({message:`foodbrand with id ${id} was removed succesfully`});
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
            return res.status(404).json({message: `no foodbrand with id ${id}`});
        }
        return res.status(200).json(await FoodBrand.findById(id));
   } catch(error) {
        return res.status(500).json({error: error.message});
   }
}

async function addCat(req, res) {
     try {
          const {catId} = req.params;
          const {foodBrandId} = req.params;
          const foodBrand = await Service.addCat(catId, foodBrandId);
          return res.status(200).json(foodBrand);
     }catch(error) {
          return res.status(500).json({message: error.message});
     }
}
















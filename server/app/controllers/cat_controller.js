const Cats = require('../models/cat_model');
const Service = require('../services/cat_service');

module.exports = {
    getAll,
    add,
    getById,
    update,
    remove,
    addOwner,
    addFoodBrand,
    raport,
    raport2
}

async function getAll(_, res) {
    try {
        const cats = await Service.getAll();
        return res.status(200).json(cats);
    }catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function add(req, res) {
   try {
        const addedCat = await Service.add(req.body);
        return res.status(200).json(addedCat);
   } catch (error) {
        return res.status(500).json({
            error: error.message
        });
   } 
}


async function getById(req, res) {
   try {
        const {id} = req.params;
        const foundCat = await Service.getById(id);
        if (!foundCat){
            return res.status(404).json({
                message: `no cat with id ${id}`
            })
        }
        return res.status(200).json(foundCat);
   } catch (error) {
        return res.status(500).json({
            message: error.message
        });
   } 
}

async function update(req, res) {
   try {
        const {id} = req.params;
        const params = req.body;
        const wasUpdated = await Service.update(id, params);
        if (!wasUpdated) {
            return res.status(404).json({
                message:`no cat with id ${id}`
            });
        }
        return res.status(200).json(await Cats.findById(id));
   } catch (error) {
        return res.status(500).json({
            error: error.message
        });
   } 
}

async function remove(req, res) {
   try {
        const {id} = req.params;
        const wasRemoved = await Service.remove(id);
        if (!wasRemoved) {
            return res.status(404).json({
                message: `no cat with id ${id}`
            });
        }
        return res.status(200).json({
            message: `cat with id ${id} was removed succesfully`
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
   } 
}

async function addOwner(req, res) {
    try {
        const {ownerId} = req.params;
        const {catId} = req.params;
        const cat = await Service.addOwner(catId, ownerId);
        return res.status(200).json(cat);
    }catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function addFoodBrand(req, res) {
    try {
        const {catId} = req.params;
        const {foodBrandId} = req.params;
        const cat = await Service.addFoodBrand(catId, foodBrandId);
        return res.status(200).json(cat);
    }catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function raport(_, res) {
    try {
        let raport = await Cats.aggregate([
            {
                $lookup: {
                    from: 'foodbrands', 
                    localField: 'foodBrands', 
                    foreignField: '_id', 
                    as: 'output'
                }
            }, 
            {
                $addFields:{
                    prices: '$output.price'
                }
            },
            {
                $unset: "output" , 
            },
            {
                $unset: "foodBrands"
            },
            {
                $addFields: { 
                    averagePrice: {
                        $avg: "$prices"
                    }
                }
            }, 
            {
                $sort: {
                    averagePrice: -1
                }
            }

        ])
        res.status(200).json(raport);
    }
    catch(error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

async function raport2(_, res) {
    try {
        let raport = await Cats.aggregate([
            {
                $lookup: {
                    from: 'foodbrands', 
                    localField: 'foodBrands', 
                    foreignField: '_id', 
                    as: 'output'
                }
            }, 
            {
                $addFields:{
                    prices: '$output.price'
                }
            },
            {
                $unset: "output" , 
            },
            {
                $unset: "foodBrands"
            },
            {
                $addFields: { 
                    sumPrice: {
                        $sum: "$prices"
                    }
                }
            }, 
            {
                $sort: {
                    sumPrice: 1
                }
            }

        ])
        res.status(200).json(raport);
    }
    catch(error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
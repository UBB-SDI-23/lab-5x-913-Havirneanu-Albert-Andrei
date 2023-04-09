const Cat = require('../models/cat_model');
const Owner = require('../models/owner_model');
const FoodBrand = require('../models/food_brand_model');

module.exports = {
    getAll,
    add,
    getById,
    update,
    remove, 
    addOwner,
    addFoodBrand,
}

async function getAll() {
    const cats = await Cat.find({}).select('-owner -foodBrands');
    return cats;
}

async function add(params) {
   const newCat = await Cat.create(params);
   return newCat;
}

async function getById(id) {
   const cat = await Cat.findById(id).populate('foodBrands owner');
   return cat; 
}

async function update(id, params) {
   const count = (await Cat.updateOne({_id: id}, params)).modifiedCount;
   return count; 
}

async function removeCatFromUser(catId) {
   const cat = await Cat.findOne({_id: catId});
   const ownerId = cat.owner;
   await Owner.updateOne({_id: ownerId}, {$pull: {cats: catId}});
}

async function removeCatFromFoodBrands(id) {
   await FoodBrand.updateMany({}, {$pull: {
      cats: id
   }})
}

async function remove(id) {
   await removeCatFromFoodBrands(id);
   await removeCatFromUser(id);
   const count = (await Cat.deleteOne({_id: id})).deletedCount;
   return count; 
}

async function ownerExists(id) {
   const exists = await Owner.findById(id);
   if (exists == null)
      return false;
   return true;
}

async function addOwner(catId, ownerId) {
   const cat = await Cat.findById(catId);
   if (cat.owner) {
      throw new Error(`cat ${catId} already has a owner!`);
   }
   if (!(await ownerExists(ownerId))) {
      throw new Error(`owner ${ownerId} does not exist!`);
   } 
   cat.owner = ownerId;
   const owner = await Owner.findById(ownerId);
   owner.cats.push(catId);
   await owner.save();
   await cat.save();
   return cat;
}


function foodBrandInList(foodBrands, foodBrandId) {
   let exists = false;
   foodBrands.forEach(foodBrand => {
      if (foodBrand.equals(foodBrandId)) {
         exists = true;
      }
   });
   return exists;
}

async function addFoodBrand(catId, foodBrandId) {
   const cat = await Cat.findById(catId);
   const foodBrand = await FoodBrand.findById(foodBrandId);
   if (!cat) {
      throw new Error(`no cat with id ${catId}`);
   }
   if (!foodBrand) {
      throw new Error(`no foodbrand with id ${foodBrandId}`);
   }
   if (foodBrandInList(cat.foodBrands, foodBrandId)) {
      throw new Error(`food brand already in the list`);
   }
   cat.foodBrands.push(foodBrandId);
   foodBrand.cats.push(catId);
   await foodBrand.save();
   await cat.save();
   return cat;
}
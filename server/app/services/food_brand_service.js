const FoodBrand = require('../models/food_brand_model');
const Cat = require('../models/cat_model');

module.exports = {
    getAll,
    add,
    getById,
    remove,    
    update,
    addCat
}


async function getAll() {
    const foodBrands = await FoodBrand.find({}).select('-cats');
    return foodBrands;
}

async function add(params) {
    const newFoodBrand = await FoodBrand.create(params);
    return newFoodBrand;
}

async function getById(id) {
    const foodBrand = await FoodBrand.findById(id).populate('cats');
    return foodBrand;
}

async function removeFoodBrandFromCats(id) {
    await Cat.updateMany({}, {$pull: {
        foodBrands: id
    }})
}


async function remove(id) {
    removeFoodBrandFromCats(id);
   const count = (await FoodBrand.deleteOne({_id : id})).deletedCount;
   return count;
}

async function update(id, params) {
    const count = (await FoodBrand.updateOne({_id : id,}, params)).modifiedCount;
    return count;
}

function catInTheList(cats, catId) {
    let exists = false;
    cats.forEach(cat => {
        if (cat.equals(catId)) {
            exists = true
        }
    })
    return exists;
}

async function addCat(catId, foodBrandId) {
    const cat = await Cat.findById(catId);
    const foodBrand = await FoodBrand.findById(foodBrandId);
    if (!cat) {
        throw new Errror(`no cat with id ${catId}`);
    }
    if (!foodBrand) {
        throw new Error(`no foodbrand with id ${foodBrandId}`);
    }
    if (catInTheList(foodBrand.cats, catId)) {
        throw new Error('cat already in the list');
    }
    cat.foodBrands.push(foodBrandId);
    foodBrand.cats.push(catId);
    await cat.save();
    await foodBrand.save();
    return foodBrand;
}


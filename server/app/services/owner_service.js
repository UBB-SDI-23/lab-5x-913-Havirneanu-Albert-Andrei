const Owner = require('../models/owner_model');
const Cat = require('../models/cat_model');
const Address = require('../models/address_model');

module.exports = {
    getAll,
    add,
    getById,
    remove, 
    update,
    filterByAge,
    addCat,
    addAddress,
    //this is just for the sake of the tests
    catExists
}

async function getAll() {
   const owners = await Owner.find({}).select('-cats');
   return owners; 
}

async function add(params) {
   const newOwner = await Owner.create(params);
   return newOwner;
}

async function getById(id) {
   const owner = await Owner.findById(id).populate('cats address');
   return owner;
}

async function remove(id) {
   await removeOwnerFromCats(id);
   const count = (await Owner.deleteOne({_id : id})).deletedCount;
   await removeOwnerFromAddress(id);
   return count; 
}

async function removeOwnerFromAddress(ownerId) {
   const address = await Address.findOne({owner: ownerId});
   if (address) {
      address.owner = undefined;
      await address.save();
   }
}

async function removeOwnerFromCats(ownerId) {
   const owner = await Owner.findOne({_id: ownerId});
   const cats = owner.cats;
   cats.forEach(async catId => {
      const cat = await Cat.findOne({_id: catId});
      cat.owner = undefined;
      await cat.save();
   })
}

async function update(id, params) {
    const count = (await Owner.updateOne({_id : id}, params)).modifiedCount;
    return count;
}

async function filterByAge(age) {
    let owners = await Owner.find().gt('age', age);
    return owners;
}

function catAlreadyInTheList(cats, catId) {
   let exists = false;
   cats.forEach(cat => {
      if (cat.equals(catId)) {
         exists = true;
      }
   });
   return exists;
}

async function catExists(id) {
   const exists = await Cat.findById(id);
   if (exists == null) {
      return false;
   }
   return true;
}

async function addCat(ownerId, catId) {
   const owner = await Owner.findById(ownerId);
   if (catAlreadyInTheList(owner.cats, catId)) {
      throw new Error(`cat ${catId} is already in the list!`);
   }
   if (!(await catExists(catId))) {
      throw new Error(`cat ${catId} does not exist!`);
   }
   const cat = await Cat.findById(catId);
   cat.owner = ownerId;
   owner.cats.push(catId);
   await owner.save();
   await cat.save();
   return owner;
}

async function addAddress(ownerId, addressId) {
   const owner = await Owner.findById(ownerId);
   const address = await Address.findById(addressId);
   if (!owner) {
      throw new Error('owner does not exist!');
   }
   if (!address) {
      throw new Error('address does not exist!');
   }
   if (owner.address) {
      throw new Error(`owner ${ownerId} already has an address!`);
   }
   if (address.owner) {
      throw new Error(`address ${addressId} already associated with an owner`);
   }
   owner.address = addressId;
   address.owner = ownerId;
   await owner.save();
   await address.save();
   return owner;
}
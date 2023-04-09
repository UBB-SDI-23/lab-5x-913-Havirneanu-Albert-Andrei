const Address = require('../models/address_model');
const Owner = require('../models/owner_model');


module.exports = {
    getAll, 
    add,
    getById,
    update,
    remove,
    addOwner,
}

async function getAll() {
   const addresses = Address.find({});
   return addresses; 
}

async function add(params) {
    const newAddress = await Address.create(params);
    return newAddress;
}

async function getById(id) {
   const address = await Address.findById(id).populate('owner');
   return address;
}

async function update(id, params) {
   const count = (await Address.updateOne({_id: id}, params)).modifiedCount;
   return count;
}

async function removeAddressFromOwner(addressId) {
   const owner = await Owner.findOne({address: addressId});
   if (owner) {
      owner.address = undefined;
      await owner.save()
   }
}

async function remove(id) {
   const count = (await Address.deleteOne({_id: id})).deletedCount;
   await removeAddressFromOwner(id);
   return count;
}

async function addOwner(ownerId, addressId) {
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
   return address;
}
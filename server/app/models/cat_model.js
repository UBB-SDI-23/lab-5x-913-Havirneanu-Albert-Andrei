const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            validate: {
                validator: (name) => name.trim() != "", 
                message: _ =>  'name of cat cannot be empty'
            } 
        },

        breed: {
            type: String, 
            required: true,
            validate: {
                validator: (breed) => breed.trim() != "", 
                message: _ =>  'breed of cat cannot be empty'
            } 
        },

        yearBirth: {
            type: String, 
            required: true
        },

        color: {
            type: String, 
            required: true,
            validate: {
                validator: (color) => color.trim() != "", 
                message: _ =>  'color of cat cannot be empty'
            } 
        },

        vaccinated: {
            type: Boolean, 
            required: true
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Owners',
        }, 

        foodBrands:[{
            type: Schema.Types.ObjectId,
            ref: 'FoodBrands'
        }]
    }
)

const Cats = mongoose.model('Cats', catSchema);
module.exports = Cats;
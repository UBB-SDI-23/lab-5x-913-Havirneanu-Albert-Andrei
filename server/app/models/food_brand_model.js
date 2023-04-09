const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const foodBrandSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            validate: {
                validator: (name) => name.trim() != "", 
                message: _ =>  'name of foodbrand cannot be empty'
            } 
        },

        mainIngridient: {
            type: String,
            required: true,
            validate: {
                validator: (mainIngridient) => mainIngridient.trim() != "", 
                message: _ =>  'main ingridient field cannot be empty'
            } 
        }, 

        price: {
            type:Number,
            required:true,
            min: [1, 'Price cannot be negative']
        },

        email: {
            type: String,
            required: true,
            validate: {
                validator: (v) => {
                    const regex = RegExp('^\\S+@\\S+\\.\\S+$"');
                    return regex.test(v);
                },
                message: mail => `${mail.value} is not a valid email`
            }
        },
        cats: [{
            type: Schema.Types.ObjectId,
            ref: 'Cats'
        }]
    }
)

const FoodBrands = mongoose.model('FoodBrands', foodBrandSchema);
module.exports = FoodBrands;
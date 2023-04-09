const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = Schema(
    {
        surName: {
            type: String,
            required: true,
            validate: {
                validator: (surName) => surName.trim() != "", 
                message: _ =>  'surname cannot be empty'
            } 
        },

        firstName: {
            type: String, 
            required: true,
            validate: {
                validator: (firstName) => firstName.trim() != "", 
                message: _ =>  'first name cannot be empty'
            } 
        }, 

        phone: {
            type: String,  
            required: true,
            validate: {
                validator: (value) => {
                    const regex = /^(?:\+40|0)[7-9](?:\d{7}|\d{8})$/;
                    return regex.test(value);
                },

                message: phone => `${phone.value} is not correct!`
            }
        }, 

        mail: {
            type: String, 
            required: true,
            validate: {
                validator: (value) => {
                    const regex = RegExp('^\\S+@\\S+\\.\\S+$"');
                    return regex.test(value);
                },

                message: mail => `${mail.value} is not correct!`
            }
        },

        age: {
            type: Number, 
            required: true,
            min: [18, 'At least 18']
        },
        
        cats: [{
            type: Schema.Types.ObjectId,
            ref: 'Cats'
        }], 

        address: {
            type: Schema.Types.ObjectId,
            ref: 'Addresses'
        }
    }
)

const Owners = mongoose.model('Owners', ownerSchema);
module.exports = Owners;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = Schema(
    {
        streetName: {
            type: String,
            required: true,
            validate: {
                validator: (streetName) => streetName.trim() != "", 
                message: _ =>  'name of street cannot be empty'
            } 
        },

        streetNumber: {
            type: Number,
            required: true,
            validate: {
                validator: (streetNumber) => streetNumber > 0,
                message: _ => 'street number must be positive!'
            }
        }, 

        zipCode: {
            type: Number,
            required: true,
            validate: {
                validator: (zip) => {
                    return zip >= 100000 && zip <= 999999;
                },

                message: _ => 'zip code must be a 6 number digit'
            }
        },

        apartmentNumber: {
            type: Number,
            required: true,
            validate: {
                validator: (apartmentNumber) => apartmentNumber > 0,
                message: _ => 'apartment number must be positive!'
            }
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Owners'
        }
    }
)

const Addresses = mongoose.model('Addresses', addressSchema);
module.exports = Addresses;
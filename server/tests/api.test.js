const mongoose = require('mongoose');
const OwnerService = require('../services/owner_service');

beforeEach(async () => {
    await mongoose.connect('mongodb+srv://Andrei:Gabriela23@mpp.bcozf9p.mongodb.net/?retryWrites=true&w=majority');
})

afterEach(async () => {
    await mongoose.connection.close();
})

describe('filter owners by age', () => {
    it('should return owners older than a given age', async() => {
        const filteredOwners = await OwnerService.filterByAge(1);
        expect(filteredOwners.length).toBeGreaterThan(0);
    })
})

describe('check if a cat exists', () => {
    it('should return true/false if a cat exists or not', async() => {
        const cat = await OwnerService.catExists('111111111111111111111111');
        expect(cat).toBe(false);
    })
})

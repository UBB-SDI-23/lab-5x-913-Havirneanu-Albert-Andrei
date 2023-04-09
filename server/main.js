const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

const catRoot = '/cats'
const ownerRoot = '/owners';
const foodBrandRoot = '/foodBrands';
const addressRoot = '/addresses';


const catRoute = require('./app/routes/cat_route');
const ownerRoute = require('./app/routes/owner_route');
const foodBrandRoute = require('./app/routes/food_brand_route');
const addressRoute = require('./app/routes/address_route');

app.use(express.json());
app.use(cors());
app.use(`${catRoot}`, catRoute);
app.use(`${ownerRoot}`, ownerRoute);
app.use(`${foodBrandRoot}`, foodBrandRoute);
app.use(`${addressRoot}`, addressRoute);


mongoose.connect('mongodb+srv://Andrei:Gabriela23@mpp.bcozf9p.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to bongo');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    })
    .catch(() => {
        console.log('Failed to connect to bongo');
    });
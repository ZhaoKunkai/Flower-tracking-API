const mongoose = require('mongoose');

const FlowerStock = mongoose.Schema({
    flowerName:{
        type:String,
        unique:false
    },
    flowerId: String,
    quantityInStock: Number
});

module.exports = mongoose.model('flowerstock', FlowerStock);
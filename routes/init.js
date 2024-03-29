const express = require('express');
const router = express.Router();

const FlowerStock = require('../models/FlowerStock');

router.get('/', async(req, res) => {
  try {
      // Define the flower data
      const flowers = [
          { flowerName: 'Rose', flowerId: 'f123', quantityInStock: 100 },
          { flowerName: 'Lily', flowerId: 'f234', quantityInStock: 150 },
          { flowerName: 'Tulip', flowerId: 'f456', quantityInStock: 200 },
          { flowerName: 'chlor', flowerId: 'f567', quantityInStock: 200 },
          { flowerName: 'cuckoo', flowerId: 'f789', quantityInStock: 200 },
          
      ];

      // Loop through each flower data
      for (const flower of flowers) {
          // Check if the flower already exists in the database
          const existingFlower = await FlowerStock.findOne({ flowerName: flower.flowerName });

          if (existingFlower) {
              // If flower exists, update the existing document
              await FlowerStock.updateOne({ _id: existingFlower._id }, flower);
          } else {
              // If flower does not exist, create a new document
              const newFlower = new FlowerStock(flower);
              await newFlower.save();
          }
      }

      res.status(200).json({ message: 'Recorded Initial Storage' });
  } catch (err) {
      console.error(err.message);
      res.status(400).json({ error: 'Invalid request data' });
  }
});

module.exports = router;

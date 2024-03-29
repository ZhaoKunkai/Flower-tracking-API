const express = require('express');
const router = express.Router();

const FlowerStock = require('../models/FlowerStock');

router.get('/', async (req, res) => {
    try {
        const fname = ['Rose','Lily','Tulip','chlor','cuckoo'];
        const flowers = [];

        for (let i = 0; i < 5; i++) {
            const flower = await FlowerStock.findOne({ flowerName: fname[i] });
          if (!flower) {
            // 如果没有找到匹配的文档，则返回404 Not Found
            return res.status(404).json({ error: 'Flower not found' });
          }

          // 找到了匹配的文档，返回它
          flowers.push(flower);
        }

        res.status(200).json(flowers);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
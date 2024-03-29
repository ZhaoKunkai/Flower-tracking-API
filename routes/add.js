const express = require('express');
const router = express.Router();

const FlowerStock = require('../models/FlowerStock');

router.post('/', async (req, res)=> {
   try {
      const { flowerName, flowerId, quantityToAdd } = req.body;
      const flower = await FlowerStock.findOne ({ flowerId });

      if (!flower) {
        flower = new FlowerStock({
            flowerName,
            flowerId,
            quantityInStock:quantityToAdd
        })
     };

      if (flower.flowerName === flowerName) {
        flower.quantityInStock += parseInt(quantityToAdd); //保证数据类型的一致，否则容易被当作字符串相加
        await flower.save();//这里会直接覆盖原来document里的数据，因为这是通过find找到的，而不是new新建的
        return res.status(200).json( { message: `New flowers added to inventory successfully. Now the quantity of ${flowerName} is ${flower.quantityInStock}` });
      }  else {
        return res.status(400).json({ error: 'Invalid flower name' });
      };
   } catch (err) {
      console.error(err.message);
      res.status(400).json({ error: 'Invalid request data' });
   };
});

module.exports = router;
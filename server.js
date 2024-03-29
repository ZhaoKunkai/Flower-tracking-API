const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/usage', require('./routes/usage'));
app.use('/api/products', require('./routes/products'));
app.use('/api/init', require('./routes/init'));
app.use('/api/inventory', require('./routes/get'));
app.use('/api/inventory', require('./routes/add'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
    // process.exit(-1);
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});


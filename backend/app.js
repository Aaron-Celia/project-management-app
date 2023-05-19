const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());



///// routes go here /////
app.use('/api/v1', require('./routes'))

require('./mongo/config/config.js');

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
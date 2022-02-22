// Load modules
const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/api/products');
const cors = require('cors');

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api/products', products); //Use api routes
app.use(cors({ origin: true, credentials: true }));

// Mongoose connection
mongoose.connect(db)
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.log(err));

// Initialize port and start server on port 4000
const port = process.env.port || 4000;
app.listen(port, function () {
    console.log('Server is starting at ' + port);
})

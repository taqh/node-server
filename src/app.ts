const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// allow access to the api from any origin
app.use(cors());



// app.use((req, res, next) => {
//    res.setHeader('Access-Control-Allow-Origin', '*'); // * means any origin
//    res.setHeader(
//      'Access-Control-Allow-Methods',
//      'GET, POST, PATCH, PUT, DELETE'
//    );
//    res.setHeader('Access-Control-Allow-Headers', ' Content-Type, Authorization');
 
//    next();
//  });

const blogRoutes = require('./routes/blogs');

const router = express.Router();

app.use('/', blogRoutes)

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server is 🔥 at http://localhost:${port}/blogs`);
});

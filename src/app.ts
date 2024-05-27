import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');

const app = express();

// multer settings
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter: multer.Options['fileFilter'] = (
  req: Request,
  file,
  cb: multer.FileFilterCallback
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// log incoming request parameters
const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Route: ' + req.path);
  console.log('Method: ' + req.method);
  next();
};

// middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(multer({storage: fileStorage, fileFilter: fileFilter})).single('image');
app.use(loggingMiddleware);

// Api routes
app.use('/', blogRoutes);

app.use('/auth', authRoutes);

const port = process.env.PORT || 'http://localhost:5000';
const URI =
  process.env.MONGODB_URI;

// Connect to the database
mongoose
  .connect(URI, {})
  .then(() => {
    console.log('Connected 📡 to MongoDB');
    app.listen(5000, () => {
      console.log(`Server is 🔥 at ${port}`);
    });
  })
  .catch((err: any) => {
    console.log('Failed to connect to MongoDB', err);
  });

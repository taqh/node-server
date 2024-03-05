import { Request, Response, NextFunction } from 'express';
const router = require('express').Router();
const  Writer =  require('../models/writer');
import { MongooseError } from 'mongoose';
const authController = require('../controllers/auth');

interface User {
   firstname: string;
   lastname: string;
   email: string;
   password: string;
}

const users: User[] = [];

// POST /auth/signup
router.post('/signup', authController.signup);

// POST /auth/login
router.post('/login', authController.login);


module.exports = router;

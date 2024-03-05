import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';
const Writer = require('../models/writer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

interface user {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const login = (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser: user;

  Writer.findOne({ email: email })
    .then((user: user) => {
      if (!user) {
        return res.status(404).json({
          message: 'Couldnt find a user with that email',
        });
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((passwordMatch: boolean) => {
      if (!passwordMatch) {
        return res.status(401).json({
          message: 'Invalid password',
        });
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        'thiscodeisforageotechwriter',
        { expiresIn: '9h' }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        name: loadedUser.firstname,
        email: loadedUser.email,
        role: 'staff',
        avatar: '',
      });
    })
    .catch((error: MongooseError) => {
      res.status(500).json({
        message: 'Unhandled excepion',
      });
      console.log(error);
    });
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const writer = new Writer({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  Writer.findOne({ email: req.body.email }).then((result: user) => {
    if (result) {
      console.log(result);
      return res.status(409).json({
        message: 'A user with that email already exists!',
      });
    }
  });
  bcrypt
    .hash(req.body.password, 12)
    .then((hashedPassword: string) => {
      writer.password = hashedPassword;
      return writer.save();
    })
    .then((result: user) => {
      res.status(201).json({
        message: 'Account created successfully!',
        userid: result._id,
      });
    })
    .catch((err: MongooseError) => {
      console.log(err);
      res.status(500).json({
        message: 'Failed to create account!',
        error: err,
      });
    });
};

import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';
const Article = require('../models/blog');
import jwt from 'jsonwebtoken';

export const getArticles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: 'Get all articles',
    data: 'Your list of data',
  });
};

export const createArticle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const article = new Article({
    imageUrl: 'add file upload later',
    title: req.body.title,
    excerpt: req.body.description,
    content: req.body.content,
    author: req.body.author,
  });
  const token = req.get('Authorization')?.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token!, 'thiscodeisforageotechwriter');
  } catch (err) {
    console.log(err);
    return res.status(500).json('Internal server error');
  }
  if (!decodedToken) {
    return res.status(401).json('Not authorized');
  }
  article
    .save()
    .then((result: any) => {
      console.log(result);
      res.status(201).json({
        message: 'Created new article successfully',
        data: result,
      });
    })
    .catch((error: MongooseError) => console.log(error));
};

export const updateArticle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: 'Update article',
    data: req.body,
  });
};

export const deleteArticle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: 'Delete article',
    data: req.body,
  });
};

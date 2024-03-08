import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

module.exports =  (req: Request, res: Response, next: NextFunction) => {
  // access token attached to header 
  const token = req.get('Authorization')?.split(' ')[1];
  let decodedToken;
  if (!token) {
    return res.status(401).json('Not Authorized');
  }

  // decode token if present
  try {
    decodedToken = jwt.verify(token!, 'thiscodeisforageotechwriter');
  } catch (err) {
    console.log(err);
    return res.status(500).json('Internal server error');
  }
  if (!decodedToken) {
    return res.status(401).json('Not authorized');
  }
  req.body.UserData = {userId: decodedToken.userId};
  next();
};

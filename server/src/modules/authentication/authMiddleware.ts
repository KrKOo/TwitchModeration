import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: any, res: any, next: NextFunction) => {
  const token =
    req.cookies['access-token'] ||
    req.headers['x-access-token'] ||
    req.body.token ||
    req.query.token;

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY || '');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

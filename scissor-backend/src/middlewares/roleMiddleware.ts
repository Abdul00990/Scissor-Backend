import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user';

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    if (!user || !roles.some(role => user.roles.includes(role))) {
      return res.status(403).send('Access denied');
    }

    next();
  };
};
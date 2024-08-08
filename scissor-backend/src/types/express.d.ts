import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; roles: string[] }; // Adjust the structure based on your JWT payload
    }
  }
}

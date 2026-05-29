import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    const issues = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
    return res.status(400).json({ error: 'Validation failed', details: issues });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal Server Error' });
}

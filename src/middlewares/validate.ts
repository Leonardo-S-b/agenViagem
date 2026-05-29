import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

export const validateBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    return next();
  } catch (err) {
    return next(err as ZodError);
  }
};

export const validateParams = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = schema.parse(req.params);
    req.params = { ...req.params, ...parsed } as any;
    return next();
  } catch (err) {
    return next(err as ZodError);
  }
};

import { Router, Request, Response, NextFunction } from 'express';
import * as service from '../services/viagemService';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await service.getAll();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const item = await service.getById(id);
    if (!item) return res.status(404).json({ error: 'Viagem not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const viagem = await service.createViagem(req.body);
    res.status(201).json(viagem);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const viagem = await service.updateViagem(id, req.body);
    res.json(viagem);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await service.deleteViagem(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;

import { Router, Request, Response, NextFunction } from 'express';
import * as service from '../services/reservaService';

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
    if (!item) return res.status(404).json({ error: 'Reserva not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reserva = await service.createReserva(req.body);
    res.status(201).json(reserva);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/cancel', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await service.cancelReserva(id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await service.deleteReserva(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;

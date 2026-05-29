import { Router, Request, Response, NextFunction } from 'express';
import * as service from '../services/clienteService';
import { validateBody, validateParams } from '../middlewares/validate';
import { createClienteSchema, updateClienteSchema, paramIdSchema } from '../schemas/clienteSchema';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await service.getAll();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateParams(paramIdSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const item = await service.getById(id);
    if (!item) return res.status(404).json({ error: 'Cliente not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});


router.get('/:id/reservas', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid cliente id' });
    }

    const reservas = await service.getReservasByClienteId(id);
    if (reservas === null) return res.status(404).json({ error: 'Cliente not found' });
    return res.json(reservas);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/email-reservas', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clienteId = Number(req.params.id);

    if (!Number.isInteger(clienteId) || clienteId <= 0) {
      return res.status(400).json({ error: 'Invalid cliente id' });
    }

    const result = await service.sendReservasEmail(clienteId);

    if (result === null) {
      return res.status(404).json({ error: 'Cliente not found' });
    }

    if (result.count === 0) {
      return res.status(400).json({ error: 'No reservations to email' });
    }

    return res.status(202).json({ message: 'Email sent successfully', reservationsCount: result.count });
  } catch (err) {
    next(err);
  }
});

router.post('/', validateBody(createClienteSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cliente = await service.createCliente(req.body);
    res.status(201).json(cliente);
  } catch (err: any) {
    if (err?.code === 'P2002') return res.status(409).json({ error: 'Unique constraint failed' });
    next(err);
  }
});

router.put('/:id', validateParams(paramIdSchema), validateBody(updateClienteSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const cliente = await service.updateCliente(id, req.body);
    res.json(cliente);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateParams(paramIdSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await service.deleteCliente(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;

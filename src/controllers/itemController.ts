import { Router, Request, Response, NextFunction } from 'express';
import * as service from '../services/itemService';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await service.getAll();
        res.json(items);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const item = await service.getById(id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body;
        const item = await service.createItem({ name, description });
        res.status(201).json(item);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const item = await service.updateItem(id, req.body);
        res.json(item);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await service.deleteItem(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

export default router;

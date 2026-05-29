import express, { Request, Response, NextFunction } from 'express';
import itemRouter from './controllers/itemController';
import clienteRouter from './controllers/clienteController';
import viagemRouter from './controllers/viagemController';
import reservaRouter from './controllers/reservaController';

const app = express();
app.use(express.json());

app.use('/items', itemRouter);
app.use('/clientes', clienteRouter);
app.use('/viagens', viagemRouter);
app.use('/reservas', reservaRouter);

import errorHandler from './middlewares/errorHandler';

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

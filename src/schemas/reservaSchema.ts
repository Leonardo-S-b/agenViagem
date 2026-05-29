import { z } from 'zod';

export const createReservaSchema = z.object({
  clienteId: z.number().int().positive(),
  viagemId: z.number().int().positive(),
  quantidade_assentos: z.number().int().positive(),
});

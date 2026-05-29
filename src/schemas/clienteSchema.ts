import { z } from 'zod';

export const createClienteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().optional(),
  cpf: z.string().min(11, 'CPF inválido').max(14).transform(s => s.replace(/[^0-9]/g, '')),
});

export const updateClienteSchema = createClienteSchema.partial();

export const paramIdSchema = z.object({ id: z.preprocess((v) => Number(v), z.number().int().positive()) });

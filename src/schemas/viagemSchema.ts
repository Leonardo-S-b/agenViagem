import { z } from 'zod';

const dateString = z.string().refine((s) => !isNaN(Date.parse(s)), { message: 'Data inválida' });

export const createViagemSchema = z.object({
  destino: z.string().min(1, 'Destino é obrigatório'),
  descricao: z.string().optional(),
  data_saida: dateString,
  data_retorno: dateString,
  valor: z.number().positive('Valor deve ser positivo'),
  total_assentos: z.number().int().positive('Total de assentos deve ser maior que zero'),
});

export const updateViagemSchema = createViagemSchema.partial();

import prisma from '../prisma/client';

export const getAll = async () => prisma.cliente.findMany();

export const getById = async (id: number) => prisma.cliente.findUnique({ where: { id } });

export const createCliente = async (data: { nome: string; email: string; telefone?: string; cpf: string }) => {
  return prisma.cliente.create({ data });
};

export const updateCliente = async (id: number, data: Partial<{ nome: string; email: string; telefone?: string; cpf: string }>) => {
  return prisma.cliente.update({ where: { id }, data });
};

export const deleteCliente = async (id: number) => prisma.cliente.delete({ where: { id } });

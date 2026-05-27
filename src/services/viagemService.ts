import prisma from '../prisma/client';

export const getAll = async () => prisma.viagem.findMany();

export const getById = async (id: number) => prisma.viagem.findUnique({ where: { id } });

export const createViagem = async (data: {
  destino: string;
  descricao?: string;
  data_saida: Date | string;
  data_retorno: Date | string;
  valor: number;
  total_assentos: number;
}) => {
  if (data.total_assentos <= 0) throw new Error('total_assentos must be > 0');
  const created = await prisma.viagem.create({
    data: {
      ...data,
      assentos_ocupados: 0,
      assentos_disponiveis: data.total_assentos,
    },
  });
  return created;
};

export const updateViagem = async (id: number, data: Partial<any>) => prisma.viagem.update({ where: { id }, data });

export const deleteViagem = async (id: number) => prisma.viagem.delete({ where: { id } });

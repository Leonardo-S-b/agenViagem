import prisma from '../prisma/client';

export const getAll = async () => prisma.reserva.findMany();

export const getById = async (id: number) => prisma.reserva.findUnique({ where: { id } });

export const createReserva = async (data: { clienteId: number; viagemId: number; quantidade_assentos: number }) => {
  const { clienteId, viagemId, quantidade_assentos } = data;
  if (quantidade_assentos <= 0) throw new Error('quantidade_assentos must be > 0');

  return prisma.$transaction(async (tx) => {
    const cliente = await tx.cliente.findUnique({ where: { id: clienteId } });
    if (!cliente) throw new Error('Cliente not found');

    const viagem = await tx.viagem.findUnique({ where: { id: viagemId } });
    if (!viagem) throw new Error('Viagem not found');

    if (viagem.assentos_disponiveis < quantidade_assentos) throw new Error('Not enough seats available');

    const reserva = await tx.reserva.create({ data: { clienteId, viagemId, quantidade_assentos } });

    const newOcupados = viagem.assentos_ocupados + quantidade_assentos;
    const newDisponiveis = viagem.total_assentos - newOcupados;

    await tx.viagem.update({ where: { id: viagemId }, data: { assentos_ocupados: newOcupados, assentos_disponiveis: newDisponiveis } });

    return reserva;
  });
};

export const cancelReserva = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const reserva = await tx.reserva.findUnique({ where: { id } });
    if (!reserva) throw new Error('Reserva not found');
    if (reserva.status === 'cancelado') throw new Error('Reserva already cancelled');

    const viagem = await tx.viagem.findUnique({ where: { id: reserva.viagemId } });
    if (!viagem) throw new Error('Viagem not found');

    const newOcupados = viagem.assentos_ocupados - reserva.quantidade_assentos;
    const newDisponiveis = viagem.total_assentos - newOcupados;

    await tx.reserva.update({ where: { id }, data: { status: 'cancelado' } });
    await tx.viagem.update({ where: { id: viagem.id }, data: { assentos_ocupados: newOcupados, assentos_disponiveis: newDisponiveis } });

    return { cancelled: true };
  });
};

export const deleteReserva = async (id: number) => prisma.reserva.delete({ where: { id } });

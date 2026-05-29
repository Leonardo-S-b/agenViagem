import prisma from '../prisma/client';
import { transporter, mailFrom } from '../utils/Email';
import nodemailer from 'nodemailer';

export const getAll = async () => prisma.cliente.findMany();

export const getById = async (id: number) => prisma.cliente.findUnique({ where: { id } });

export const createCliente = async (data: { nome: string; email: string; telefone?: string; cpf: string }) => {
  return prisma.cliente.create({ data });
};

export const updateCliente = async (id: number, data: Partial<{ nome: string; email: string; telefone?: string; cpf: string }>) => {
  return prisma.cliente.update({ where: { id }, data });
};

export const deleteCliente = async (id: number) => prisma.cliente.delete({ where: { id } });

export const getReservasByClienteId = async (clienteId: number) => {
  const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });
  if (!cliente) return null;
  return prisma.reserva.findMany({
    where: { clienteId },
    include: { viagem: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const sendReservasEmail = async (clienteId: number) => {
  const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });
  if (!cliente) return null;

  const reservas = await prisma.reserva.findMany({
    where: { clienteId },
    include: { viagem: true },
    orderBy: { createdAt: 'desc' },
  });

  if (reservas.length === 0) return { count: 0 };
  const formatDate = (d: any) => {
    if (!d) return '-';
    try {
      return new Date(d).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return String(d);
    }
  };

  const html = `
    <h2>Histórico de Reservas</h2>
    <p>Cliente: ${cliente.nome}</p>
    <ul>
      ${reservas
      .map((r: any) => `
          <li>
            <strong>Destino:</strong> ${r.viagem?.destino ?? '-'}<br/>
            <strong>Descrição:</strong> ${r.viagem?.descricao ?? '-'}<br/>
            <strong>Embarque:</strong> ${formatDate(r.viagem?.data_saida)}<br/>
            <strong>Desembarque/Retorno:</strong> ${formatDate(r.viagem?.data_retorno)}<br/>
            <strong>Assentos:</strong> ${r.quantidade_assentos}<br/>
            <strong>Status:</strong> ${r.status}
          </li>
        `)
      .join('')}
    </ul>
  `;

  try {
    const info = await transporter.sendMail({
      from: mailFrom,
      to: cliente.email,
      subject: 'Seu histórico de reservas',
      html,
    });
    const preview = nodemailer.getTestMessageUrl(info) || undefined;
    return { count: reservas.length, sent: true, previewUrl: preview };
  } catch (e: any) {
    return { count: reservas.length, sent: false, error: e?.message ?? String(e) };
  }
};


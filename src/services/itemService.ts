import prisma from '../prisma/client';

export const getAll = async () => {
    return prisma.item.findMany();
};

export const getById = async (id: number) => {
    return prisma.item.findUnique({ where: { id } });
};

export const createItem = async (data: { name: string; description?: string }) => {
    return prisma.item.create({ data });
};

export const updateItem = async (id: number, data: { name?: string; description?: string }) => {
    return prisma.item.update({ where: { id }, data });
};

export const deleteItem = async (id: number) => {
    return prisma.item.delete({ where: { id } });
};

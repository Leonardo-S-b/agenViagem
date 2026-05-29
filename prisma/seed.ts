import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Running seed...');

    // Clientes
    const clientesData = [
        { nome: 'João Silva', email: 'joao@example.com', telefone: '11999999999', cpf: '12345678901' },
        { nome: 'Maria Souza', email: 'maria@example.com', telefone: '21988888888', cpf: '98765432100' },
    ];

    await prisma.cliente.createMany({ data: clientesData });

    // Viagens
    const viagensData = [
        {
            destino: 'Rio de Janeiro',
            descricao: 'Fim de semana na praia',
            data_saida: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            data_retorno: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
            valor: 499.9,
            total_assentos: 30,
            assentos_ocupados: 0,
            assentos_disponiveis: 30,
        },
        {
            destino: 'Foz do Iguaçu',
            descricao: 'Passeio nas cataratas',
            data_saida: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
            data_retorno: new Date(Date.now() + 1000 * 60 * 60 * 24 * 23),
            valor: 899.0,
            total_assentos: 20,
            assentos_ocupados: 0,
            assentos_disponiveis: 20,
        },
    ];

    await prisma.viagem.createMany({ data: viagensData });

    // Criar uma reserva de exemplo transacionalmente
    const cliente = await prisma.cliente.findFirst({ where: { email: 'joao@example.com' } });
    const viagem = await prisma.viagem.findFirst({ where: { destino: 'Rio de Janeiro' } });

    if (cliente && viagem) {
        const quantidade = 2;
        if (viagem.assentos_disponiveis >= quantidade) {
            await prisma.$transaction(async (tx) => {
                await tx.reserva.create({ data: { clienteId: cliente.id, viagemId: viagem.id, quantidade_assentos: quantidade } });
                const newOcupados = (viagem.assentos_ocupados ?? 0) + quantidade;
                const newDisponiveis = (viagem.total_assentos ?? 0) - newOcupados;
                await tx.viagem.update({ where: { id: viagem.id }, data: { assentos_ocupados: newOcupados, assentos_disponiveis: newDisponiveis } });
            });
            console.log('Sample reservation created.');
        }
    }

    console.log('Seed finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());

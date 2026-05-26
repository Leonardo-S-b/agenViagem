Sistema de Controle de Viagens

Descrição do Projeto

O projeto consiste em uma API REST para controle de viagens de uma agência, com foco em cadastro de clientes, cadastro de viagens, criação e cancelamento de reservas e atualização automática da ocupação dos assentos.

A aplicação deve garantir consistência dos dados em todas as operações de reserva, evitando overbooking e mantendo o saldo de assentos sempre atualizado.

Objetivos do Sistema

Gerenciar clientes da agência.
Gerenciar viagens cadastradas.
Controlar reservas por cliente e por viagem.
Evitar reservas acima da capacidade disponível.
Atualizar automaticamente assentos ocupados e disponíveis.
Permitir cancelamento de reservas com reversão da ocupação.
Enviar e-mail com o histórico de reservas do cliente.

Escopo da API

A API deve fornecer operações para:

CRUD de clientes.
CRUD de viagens.
CRUD de reservas.
Consulta de histórico de reservas por cliente.
Envio de e-mail com o histórico de reservas.

Tecnologias Utilizadas

Node.js
Express
Prisma ORM
Banco de dados SQL
Nodemailer
Bruno para testes de rotas

Entidades Principais

Cliente

Armazena os dados dos clientes cadastrados no sistema.

Campos sugeridos:

id
nome
email
telefone
cpf
createdAt
updatedAt

Viagem

Armazena as viagens disponíveis para reserva.

Campos sugeridos:

id
destino
descricao
data_saida
data_retorno
valor
total_assentos
assentos_ocupados
assentos_disponiveis
createdAt
updatedAt

Reserva

Registra as reservas feitas pelos clientes.

Campos sugeridos:

id
clienteId
viagemId
quantidade_assentos
status
data_reserva
createdAt
updatedAt

Relacionamentos

Cliente possui várias Reservas.
Reserva pertence a um único Cliente.
Viagem possui várias Reservas.
Reserva pertence a uma única Viagem.

Regras de Negócio

Cadastro de Cliente

O e-mail deve ser único.
O CPF deve ser único.
Campos obrigatórios não podem ser nulos.

Cadastro de Viagem

O total de assentos deve ser maior que zero.
Os assentos ocupados devem iniciar em zero.
Os assentos disponíveis devem iniciar igual ao total de assentos.
A data de retorno deve ser maior que a data de saída.

Criação de Reserva

Ao criar uma reserva, o sistema deve:

Validar se o cliente existe.
Validar se a viagem existe.
Validar se a quantidade de assentos solicitada é maior que zero.
Validar se há assentos suficientes disponíveis.
Criar a reserva com status ativo.
Atualizar os assentos ocupados e disponíveis da viagem na mesma transação.

Cancelamento de Reserva

Ao cancelar uma reserva, o sistema deve:

Validar se a reserva existe.
Validar se a reserva ainda não foi cancelada.
Alterar o status da reserva para cancelada ou remover o registro, conforme a regra adotada.
Devolver os assentos ocupados para a viagem.
Atualizar os assentos disponíveis da viagem na mesma transação.

Consistência e Transações

A operação de criação e cancelamento de reservas deve ser transacional.

Se qualquer etapa falhar, nenhuma alteração parcial deve ser persistida.
O saldo de assentos deve sempre obedecer à fórmula:

assentos_disponiveis = total_assentos - assentos_ocupados

Funcionalidades da API

Clientes

GET /clientes
POST /clientes
GET /clientes/:id
PUT /clientes/:id
DELETE /clientes/:id

Viagens

GET /viagens
POST /viagens
GET /viagens/:id
PUT /viagens/:id
DELETE /viagens/:id

Reservas

GET /reservas
POST /reservas
GET /reservas/:id
DELETE /reservas/:id

Histórico e E-mail

GET /clientes/:id/reservas
POST /clientes/:id/email-reservas

Fluxo da Reserva

Cliente seleciona a viagem.
Sistema valida disponibilidade.
Reserva é criada.
Assentos ocupados aumentam.
Assentos disponíveis diminuem.

Fluxo do Cancelamento

Reserva é localizada.
Reserva é cancelada ou removida.
Assentos ocupados diminuem.
Assentos disponíveis aumentam.

Envio de E-mail

O sistema deve enviar um e-mail com o histórico de reservas do cliente.

Dados enviados no e-mail:

Nome do cliente
Destinos reservados
Datas das viagens
Quantidade de reservas realizadas
Status das reservas

Estrutura Inicial de Pastas

src/
├── controllers/
├── routes/
├── services/
├── prisma/
├── middlewares/
├── utils/
└── server.js

Resultado Esperado

Ao final do projeto, o sistema deve:

Possuir uma API funcional e organizada.
Persistir dados em banco relacional.
Executar transações corretamente.
Atualizar assentos automaticamente.
Permitir testes das rotas no Bruno.
Enviar e-mails com o histórico de reservas.
Representar corretamente os relacionamentos entre as entidades.
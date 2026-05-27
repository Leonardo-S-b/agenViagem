# agenViagem (scaffold)

Projeto inicial com TypeScript + Prisma (SQLite) e arquitetura em camadas (controllers/services).

Como rodar localmente:

1. Instale dependências

```bash
npm install
```

2. Configure variáveis de ambiente (opcional): copie `.env.example` para `.env`

```bash
copy .env.example .env
```

3. Gere o cliente Prisma e aplique migração inicial

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Rode em modo de desenvolvimento

```bash
npm run dev
```

Endpoints básicos (Insomnia/Postman):

- `GET /items`
- `GET /items/:id`
- `POST /items`  { "name": "Exemplo", "description": "..." }
- `PUT /items/:id`
- `DELETE /items/:id`

Testes rápidos: use Insomnia para enviar requisições contra `http://localhost:3000`.

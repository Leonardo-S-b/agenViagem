Instruções para importar a coleção no Bruno

Passos rápidos (GUI):

1. Abra o Bruno Desktop.
2. File → Import → OpenAPI Specification → selecione `bruno/agenviagem-openapi.yaml`.
3. Crie um Environment chamado `local` com a variável:
   - `baseURL` = `http://localhost:3000`
4. Na Collection, abra cada request gerado e ajuste a URL para `{{baseURL}}/...` se necessário.
5. Use Collection Runner (menu da collection → Run) para executar todos os requests.

Execução via CLI (opcional):

1. Instale Bruno CLI globalmente (se quiser rodar em CI):

```powershell
npm install -g @usebruno/cli
```

2. O fluxo típico é importar a collection no Bruno e depois usar `bru run` na pasta da coleção criada pelo Bruno.

Observações:
- O arquivo `agenviagem-openapi.yaml` descreve endpoints: `/clientes`, `/viagens`, `/reservas` e exemplos de payload.
- Se preferir, posso gerar uma coleção Bruno nativa (YAML `.bru`) com scripts e assertions prontas. Quer que eu gere também?
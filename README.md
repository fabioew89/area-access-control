# Area Access Control

API em Node.js com TypeScript para controle de acesso a areas. O projeto usa Express, TypeORM e PostgreSQL, com foco atual no cadastro e consulta de colaboradores e na base de entidades que sustentam o dominio de controle de acesso.

## Status Atual

No estado atual, a aplicacao disponibiliza:

- inicializacao de servidor Express com TypeScript
- conexao com PostgreSQL via TypeORM
- criacao e consulta de colaboradores
- tratamento centralizado de erros com `AppError`
- modelagem inicial de `Colaborador`, `Area`, `RegistroAcesso` e `Usuario`
- ambiente local com Docker Compose e Adminer

Observacao: o projeto ja possui dependencias e variaveis de ambiente relacionadas a JWT, mas os endpoints de autenticacao ainda nao estao expostos no servidor atual.

## Tecnologias

- Node.js
- TypeScript
- Express 5
- TypeORM
- PostgreSQL
- Docker Compose
- Adminer
- Zod

## Pre-requisitos

- Node.js 18 ou superior
- npm
- Docker e Docker Compose

## Instalacao

1. Clone o repositorio:

```bash
git clone https://github.com/fabioew89/area-access-control
cd area-access-control
```

2. Instale as dependencias:

```bash
npm install
```

3. Crie seu arquivo de ambiente a partir do exemplo:

```bash
cp .env_example .env
```

4. Ajuste as variaveis do `.env` conforme o seu ambiente.

5. Suba os servicos do banco:

```bash
docker compose up -d
```

6. Inicie a API em desenvolvimento:

```bash
npm run dev
```

## Scripts

- `npm run dev`: inicia a API com `tsx`
- `npm run dev:watch`: inicia a API com reload nativo do Node.js
- `npm run build`: compila o projeto para `dist`
- `npm start`: executa a versao compilada
- `npm run commit`: abre o fluxo do Commitizen

## Variaveis de Ambiente

As variaveis abaixo estao definidas em `.env_example`:

- `CPUS_LIMITS`: limite de CPU para os containers
- `MENORY_LIMITS`: limite de memoria para os containers
- `DB_HOST`: host do PostgreSQL
- `DB_PORT`: porta do PostgreSQL
- `DB_USER`: usuario do banco
- `DB_PASS`: senha do banco
- `DB_NAME`: nome do banco
- `JWT_ACCESS_SECRET`: segredo reservado para token de acesso
- `JWT_REFRESH_SECRET`: segredo reservado para token de refresh
- `PORT`: porta da API

## Endpoints Disponiveis

### Health check

- `GET /health`

Resposta esperada:

```json
{
  "status": "ok",
  "mensagem": "Servidor funcionando!"
}
```

### Colaboradores

- `POST /colaboradores`
- `GET /colaboradores`
- `GET /colaboradores/:id`

Exemplo de payload para criacao:

```json
{
  "nome": "Maria Souza",
  "matricula": "COL-001",
  "cargo": "Supervisora",
  "setor": "Operacoes",
  "foto_url": "https://exemplo.com/fotos/maria.jpg"
}
```

Regras implementadas:

- `matricula` deve ser unica
- a listagem retorna os colaboradores mais recentes primeiro
- buscar um `id` inexistente retorna erro `404`

## Banco e Ferramentas Locais

- PostgreSQL via `docker compose`
- Adminer disponivel em `http://localhost:8080`

## Estrutura do Projeto

```text
src/
├── server.ts
├── controllers/
│   └── ColaboradorController.ts
├── services/
│   └── ColaboradorService.ts
├── routes/
│   └── colaborador.routes.ts
├── database/
│   └── appDataSource.ts
├── entities/
│   ├── Area.ts
│   ├── Colaborador.ts
│   ├── RegistroAcess.ts
│   └── Usuario.ts
├── errors/
│   └── AppError.ts
└── types/
    ├── NivelRisco.ts
    ├── Perfil.ts
    └── TipoMovimento.ts
```

## Modelagem Atual

- `Colaborador`: dados cadastrais, matricula unica, status ativo e data de criacao
- `Area`: area controlada com nivel de risco, capacidade e responsavel
- `RegistroAcesso`: historico de entrada e saida por colaborador e area
- `Usuario`: usuario operador/admin para evolucao futura das rotinas internas

## Desenvolvimento

O projeto usa `synchronize: true` no TypeORM durante o desenvolvimento, entao as tabelas sao sincronizadas automaticamente com base nas entidades ao iniciar a aplicacao.

## Licenca

Este projeto esta sob a licenca ISC.

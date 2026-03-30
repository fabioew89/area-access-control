# Area Access Control

## Descrição

Este é um sistema de controle de acesso a áreas, desenvolvido em Node.js com TypeScript. O projeto utiliza Express para o servidor, TypeORM para o ORM do banco de dados PostgreSQL, e inclui autenticação JWT.

## Funcionalidades

- Autenticação de usuários com JWT
- Gerenciamento de usuários
- API RESTful
- Integração com banco de dados PostgreSQL
- Containerização com Docker

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript
- **Express** - Framework web
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hashing de senhas
- **Docker** - Containerização
- **Adminer** - Interface web para banco de dados

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/fabioew89/area-access-control
   cd area-access-control
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env_example` para `.env`
   - Preencha as variáveis necessárias (senhas, segredos JWT, etc.)

4. Inicie os serviços com Docker:
   ```
   docker-compose up -d
   ```

5. Execute o servidor em modo de desenvolvimento:
   ```
   npm run dev
   ```

## Uso

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript
- `npm start` - Inicia o servidor em produção

### Endpoints da API

- `GET /health` - Verifica se o servidor está funcionando

### Acesso ao Banco de Dados

- Adminer: http://localhost:8080

## Variáveis de Ambiente

Configure as seguintes variáveis no arquivo `.env`:

- `DB_HOST` - Host do banco de dados
- `DB_PORT` - Porta do banco de dados
- `DB_USER` - Usuário do banco de dados
- `DB_PASS` - Senha do banco de dados
- `DB_NAME` - Nome do banco de dados
- `JWT_ACCESS_SECRET` - Segredo para tokens de acesso JWT
- `JWT_REFRESH_SECRET` - Segredo para tokens de refresh JWT
- `PORT` - Porta do servidor (padrão: 3000)
- `CPUS_LIMITS` - Limite de CPUs para containers
- `MENORY_LIMITS` - Limite de memória para containers

## Estrutura do Projeto

```
src/
├── server.ts              # Ponto de entrada do servidor
├── database/
│   └── appDataSource.ts    # Configuração do TypeORM
├── entities/
│   └── Usuarios.ts         # Entidade de usuário
└── errors/
    └── AppError.ts         # Classe de erro customizada
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC.

# Desafio - Sistema de Transações Financeiras

## Visão Geral

O desafio é um backend de um sistema de transações financeiras, baseado no [desafio de backend do picpay](https://github.com/PicPay/picpay-desafio-backend), construído com foco em permitir transações entre usuários e lojistas.

## Tecnologias Usadas

- **NestJS**
- **TypeScript**
- **Docker**
- **PostgreSQL**
- **Prisma**
- **Axios**
- **Vitest**

## Arquitetura

O projeto é estruturado seguindo os princípios da arquitetura limpa, com separação clara entre a camada de domínio, aplicação e infraestrutura.

### Entidades

- **User**: Representa os usuários do sistema.
- **Transaction**: Representa as transações financeiras entre os usuários.

### Repositórios

- **TransactionsRepository**: Abstração para operações relacionadas a transações no banco de dados.
- **UsersRepository**: Abstração para operações relacionadas a usuários no banco de dados.

### Serviços

- **ExternalAuthorizationService**: Serviço para validar autorizações externas.
- **SendNotificationService**: Serviço para enviar notificações por e-mail.

### Use Cases

- **CreateTransactionUseCase**: Lógica para criação de transações financeiras.

## Configuração e Execução

1. Clone o repositório.
2. Utilize `docker-compose up` para iniciar os containers do PostgreSQL.
3. Execute `npm install` para instalar as dependências.
4. Utilize `npm run dev` para iniciar a aplicação.

## Testes

- Execute `npm run test` para rodar os testes automatizados.
- Execute `npm run test:e2e` para rodar os testes automatizados(E2E).

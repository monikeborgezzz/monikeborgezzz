# Projeto Sound App

Sobre o Projeto
O Sound App é uma aplicação web completa (Full Stack) desenvolvida para permitir
que usuários se cadastrem, façam login e gerenciem sua própria lista de músicas. O
sistema foi migrado de uma estrutura antiga de "Alunos" para um ecossistema
focado em entretenimento musical.
Node.js Express Prisma ORM MySQL JavaScript (Frontend)

Funcionalidades

Autenticação: Sistema de Cadastro e Login seguro validando Username ou E-mail.
CRUD de Músicas: Adição, visualização, edição e exclusão de faixas musicais.
Banco de Dados Relacional: Persistência de dados utilizando MySQL com Prisma
ORM.

Pré-requisitos
Antes de começar, você precisará ter instalado:
Node.js
MySQL (via XAMPP ou instalação nativa)
Git

Como Rodar o Projeto
1. Configurar o Banco de Dados
No seu MySQL, crie o banco de dados:
•
•
•

•
•
•

CREATE DATABASE sound_db;

No arquivo .env na pasta do backend, configure sua URL de conexão:

DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/sound_db"

2. Instalar Dependências e Sincronizar
No terminal, dentro da pasta backend/projeto-alunos-prisma6 :

npm install
npx prisma db push
npx prisma generate

3. Iniciar o Servidor

node index.js

4. Acessar o Frontend
Abra o arquivo index.html (na pasta frontend) no seu navegador.

Estrutura de Pastas

/
├── frontend/ # HTML, CSS e JavaScript do cliente
└── backend/
└── projeto-alunos-prisma6/
├── prisma/ # Schema e Migrations do banco
├── index.js # Servidor Express
└── .env # Variáveis de ambiente (não subir ao GitHub)
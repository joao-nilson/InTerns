# InTerns

Autores: Gabhriel Fonseca Velasco, João Nilson Quintão Barros, Lucas Cristovão Vitorino Coelho Chaves, Marcelo Rother de Souza Filho.

## Projeto InTerns - Plataforma de Vagas de Estágios em TI

### Visão Geral

O InTerns é uma plataforma web desenvolvida para conectar estudantes de tecnologia com oportunidades de estágio em empresas de TI. O sistema é composto por um backend construído com Node.js, Express e MongoDB, e um frontend utilizando React, Lucide e Tailwind CSS.

Mais detalhes sobre cada parte do sistema podem ser encontrados nos respectivos diretórios `backend/` e `frontend/`.

## Setup e Instalação

### Requisitos

- Node.js v18 ou superior com npm
- Git
- Docker e Docker Compose (para MongoDB)

### Clonando o Repositório

```bash
git clone https://github.com/joao-nilson/InTerns.git
cd InTerns
```

### Configurando e rodando o Backend

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o MongoDB usando Docker Compose:
   ```bash
   docker-compose up -d
   ```
4. Inicie o servidor backend:
   ```bash
   npm start
   ```

### Configurando e rodando o Frontend
1. Navegue até o diretório do frontend:
   ```bash
   cd ./frontend/
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor frontend:
   ```bash
   npm run dev
   ``` 

## Estrutura do Projeto

```text
InTerns/
├── backend/                 # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/         # Configurações (Singleton para MongoDB)
│   │   ├── models/         # Schemas Mongoose (M do MVC)
│   │   ├── controllers/    # Controladores (C do MVC)
│   │   ├── services/       # Lógica de negócio
│   │   └── utils/          # Helpers
│   └── server.js
├── frontend/                  # User interface
│   ├── public/              # Arquivos estáticos (favicon, robots.txt)
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── ui/          # Componentes atômicos sem regras de negócio (botões, inputs, etc.)
│   │   │   ├── layout/      # Componentes de layout (header, footer, etc.)
│   │   │   └── business/    # Componentes específicos de negócio
│   │   │
│   │   ├── pages/           # Telas completas (views)
│   │   ├── assets/          # Imagens, fontes e outros recursos
│   │   ├── data/            # Dados estáticos e mocks (temporários)
│   │   ├── index.css        # Ponto de entrada do Tailwind v4 (@import "tailwindcss")
│   │   ├── main.jsx         # Entry point do React (DOM Injection)
│   │   └── app.jsx          # Componente raiz do aplicativo
│   │
│   ├── .gitignore           # Arquivos ignorados pelo Git
│   ├── index.html           # HTML raiz
│   ├── package.json         # Manifesto de dependências e scripts
│   ├── vite.config.js       # Configuração do Vite + Plugin Tailwind
│   └── README.md            # Documentação
├── docker-compose.yml      # Para MongoDB
└── README.md
```

```
InTerns-MERN/
├── backend/                 # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/         # Configurações (Singleton para MongoDB)
│   │   ├── models/         # Schemas Mongoose (M do MVC)
│   │   ├── controllers/    # Controladores (C do MVC)
│   │   ├── services/       # Lógica de negócio
│   │   └── utils/          # Helpers
│   └── server.js
├── frontend/                  # User interface
│   interns-frontend/
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

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
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── views/            # Page components (V)
│   │   └── services/         # API calls 
│   └── package.json
├── docker-compose.yml      # Para MongoDB
└── README.md
```

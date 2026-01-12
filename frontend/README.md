# InTerns - Portal de Vagas para Estágio em TI

Este é o frontend do projeto InTerns, uma plataforma centralizada para conectar estudantes e empresas de TI.

## Tecnologias Utilizadas

- React (Vite): Escolhido pela velocidade de build e suporte nativo a ES Modules (HMR instantâneo).
- Tailwind CSS v4: Utiliza a nova engine "Vite-first", dispensando arquivos de configuração complexos e compilando CSS sob demanda (JIT).
- Lucide React: Biblioteca de ícones leve e consistente.
- Arquitetura: Componentização baseada em Atomic Design simplificado e separação de responsabilidades (SRP).

## Pré-requisitos

Para rodar este projeto localmente, você precisará ter instalado:

- Node.js: Versão 18 ou superior.

Verifique com:  

```bash
node -v
```

- NPM: Normalmente já vem instalado com o Node.

## Instalação e Execução

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. Clonar e Instalar Dependências
2. Entrar na pasta do projeto e instalar as dependências

```bash
cd frontend
npm install
```

3. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

O terminal exibirá o endereço local, geralmente: http://localhost:5173/

4. Build para Produção (Opcional)

Para gerar os arquivos estáticos otimizados (minificados) para deploy:

```bash
npm run build
```

Os arquivos serão gerados na pasta dist/.

## Estrutura do Projeto

A estrutura foi pensada para facilitar a manutenção e escalabilidade, seguindo os princípios de Engenharia de Software do documento de requisitos.

```text
interns-frontend/
├── public/              # Arquivos estáticos (favicon, robots.txt)
├── src/
│   ├── App.jsx          # Controller Principal (Roteamento e Estado Global)
│   ├── index.css        # Ponto de entrada do Tailwind v4 (@import "tailwindcss")
│   ├── main.jsx         # Entry point do React (DOM Injection)
│   └── ...              # Componentes (JobCard, Header, etc.)
├── .gitignore           # Arquivos ignorados pelo Git
├── index.html           # HTML raiz
├── package.json         # Manifesto de dependências e scripts
├── vite.config.js       # Configuração do Vite + Plugin Tailwind
└── README.md            # Documentação
```

Este projeto utiliza a versão 4 do Tailwind, então:

Não existe tailwind.config.js para configurações padrão. A detecção de arquivos é automática pelo runtime.

Importação CSS: O arquivo src/index.css contém apenas @import "tailwindcss";. Isso carrega automaticamente o Preflight (reset), variáveis de tema e utilitários.

Configuração: Tudo é gerenciado através do plugin @tailwindcss/vite no vite.config.js.

Um beijo pro Euler que me ajudou a entender esse trem! 😘

## Autores

Gabhriel Fonseca Velasco
João Nilson Quintão Barros
Lucas Cristovao Vitorino Coelho Chaves
Marcelo Rother de Souza Filho

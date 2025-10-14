# 🍎 Projeto E-Commerce Frutaria – Laravel + Next.js

Este projeto implementa um **e-commerce simples para uma frutaria**, desenvolvido com **Laravel 12 (PHP 8.3)** no backend, **Next.js 14 (TypeScript + Tailwind CSS)** no frontend e **MySQL 8.4** como banco de dados.  
Todo o ambiente está configurado via **Docker Compose**, com containers separados para backend, frontend e banco.

O sistema simula o fluxo básico de um e-commerce:

- autenticação de usuários;
- cadastro e gestão de produtos (CRUD completo);
- listagem e simulação de compra dos produtos.

---

## 🧩 O que foi solicitado

- Criar **página de login** (autenticação de usuários com Sanctum).
- Criar **página de cadastro de produtos** com operações de **criação, edição e exclusão**.
- Criar **página de listagem/venda de produtos**, simulando a experiência de compra.
- Implementar **migrations e seeds** para popular o banco.
- Adotar **boas práticas de organização**, com código limpo, componentizado e responsivo.
- Entregar o código funcional com **frontend + backend + banco** rodando em modo de desenvolvimento.

---

## ✅ O que foi entregue

- [x] **Backend (Laravel 12):**

  - Migration `products` e `users` com timestamps.
  - Seeds e factories para gerar produtos com imagens reais.
  - Autenticação com **Laravel Sanctum**.
  - Controllers:
    - `AuthController` (`register`, `login`, `logout`);
    - `ProductController` (`index`, `store`, `update`, `destroy`).
  - Rotas versionadas (`/api/v1/...`).
  - PSR-12 e princípios **SOLID** aplicados.
  - Responses padronizadas em JSON.
  - Docker configurado com PHP 8.3 e MySQL 8.4.

- [x] **Frontend (Next.js 14 + TypeScript + Tailwind):**

  - Página de **Login** integrada com a API Laravel via Axios.
  - Página de **Dashboard/Admin** para CRUD de produtos.
  - Página de **Loja** simulando a experiência de compra.
  - Contexto de autenticação (AuthContext) e de carrinho (CartContext).
  - Componentes reutilizáveis (Card, Button, Input, Header).
  - Validações client-side com **Zod**.
  - Layout totalmente responsivo.

- [x] **Banco de Dados (MySQL 8.4):**

  - Estrutura criada via migrations.
  - Seeds automáticos para popular produtos.
  - Mock com imagens reais de frutas (não randômico).

- [x] **Infraestrutura:**
  - Ambiente completo via Docker Compose.
  - Containers independentes: `backend`, `frontend`, `db`.
  - Configuração `.env` automatizada.
  - Projeto executando 100% em modo desenvolvimento.

---

## ⚙️ Tecnologias utilizadas

### Backend

- [Laravel 12](https://laravel.com/)
- PHP 8.3
- MySQL 8.4
- Sanctum para autenticação
- Eloquent ORM
- Factories e Seeders

### Frontend

- [Next.js 14](https://nextjs.org/)
- TypeScript
- React 18
- Tailwind CSS
- Axios
- Zod

### Infraestrutura

- Docker & Docker Compose
- Nginx
- Node 20
- Composer

---

## 🚀 Como executar o projeto

### Pré-requisitos

- **Docker** e **Docker Compose** instalados.

---

### 🟢 Clonagem do repositório e entrada na pasta

Clone o projeto e entre na pasta raiz:

```bash
git clone https://github.com/Robsonnsbr/test_anbfarma.git
cd test_anbfarma
```

---

### 🧰 Opção 1 — Execução automática (recomendada)

Para rodar o projeto completo (backend, frontend e banco) com um único comando, utilize o script `setup.sh`:

```bash
./setup.sh
```

O script executa automaticamente as seguintes etapas:

- Verifica Docker Compose.
- Gera os arquivos `.env` do backend e `.env.local` do frontend.
- Sobe os containers.
- Aguarda o MySQL ficar disponível.
- Instala dependências (Composer e npm).
- Gera `APP_KEY`.
- Roda migrations e seeds.
- Roda os Tests
- Inicia o frontend em modo desenvolvimento.

Após a execução, acesse:

- **Backend API:** [http://localhost/api/v1](http://localhost/api/v1)
- **Frontend:** [http://localhost:3000](http://localhost:3000)

---

### ⚙️ Opção 2 — Execução manual

Caso prefira executar manualmente:

1. Subir os containers:

   ```bash
   docker compose up -d --build
   ```

2. Rodar as migrations e seeds:

   ```bash
   docker compose exec backend php artisan migrate --seed
   ```

3. Iniciar o frontend:

   ```bash
   docker compose exec frontend npm install
   docker compose exec frontend npm run dev
   ```

---

### Acessos locais

- **Backend API:** [http://localhost/api/v1](http://localhost/api/v1)
- **Frontend:** [http://localhost:3000](http://localhost:3000)

---

## 🧠 Estrutura de pastas

```bash
.
├── backend/                # Projeto Laravel
│   ├── app/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── factories/
│   └── routes/api.php
│
├── frontend/               # Projeto Next.js
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── services/
│   └── package.json
│
├── docker-compose.yml
├── setup.sh
└── README.md
```

---

## 🧾 Endpoints principais (Laravel API)

| Método | Rota                    | Descrição                        | Autenticação |
| ------ | ----------------------- | -------------------------------- | ------------ |
| POST   | `/api/v1/register`      | Registro de usuário              | ❌           |
| POST   | `/api/v1/login`         | Login e geração de token Sanctum | ❌           |
| POST   | `/api/v1/logout`        | Logout                           | ✅           |
| GET    | `/api/v1/products`      | Listar produtos                  | ✅           |
| POST   | `/api/v1/products`      | Criar produto                    | ✅           |
| PUT    | `/api/v1/products/{id}` | Editar produto                   | ✅           |
| DELETE | `/api/v1/products/{id}` | Excluir produto                  | ✅           |

---

## 🧪 Seeds e Mock

O seed gera automaticamente 10 produtos com nomes, preços e imagens reais.

**Exemplo de produto gerado:**

```json
{
  "name": "Banana Prata",
  "description": "Banana fresca e doce da região.",
  "price": 6.9,
  "stock": 120,
  "image_url": "https://images.unsplash.com/photo-1574226516831-e1dff420e12b"
}
```

---

## 📘 Observações finais

- O sistema roda **exclusivamente em modo de desenvolvimento**.
- O código segue boas práticas de **PSR-12** e **SOLID** no backend.
- O frontend foi estruturado com **componentização** e **contexts reutilizáveis**.
- Todos os containers estão integrados e podem ser reiniciados via `docker compose down && docker compose up -d`.

---

## 🖼️ Preview Front-end

<p align="center">
  <img src="https://github.com/user-attachments/assets/19a37058-2930-41d1-bbae-8b41bcd67133" alt="Login 1" width="45%" hspace="5" />
  <img src="https://github.com/user-attachments/assets/81dfdcb4-f0e8-4f7a-975d-05fa82ee8ac6" alt="Login 2" width="45%" hspace="5" />
  <br/>
  <em>login</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ec0fef98-bc6b-4df7-81c9-1a46c034023d" alt="Home" width="60%" />
  <br/>
  <em>home</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/1d199282-6f3e-4638-a41e-0d4997254f63" alt="Dashboard 1" width="45%" hspace="5" />
  <img src="https://github.com/user-attachments/assets/2f897e94-bdf1-4fcf-940a-d6f2be477e01" alt="Dashboard 2" width="45%" hspace="5" />
  <br/>
  <em>dashboard</em>
</p>

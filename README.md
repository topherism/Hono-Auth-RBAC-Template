# 🔐 Hono Auth RBAC Template

A backend microservice for authentication, role-based access control (RBAC), and fine-grained permission management.  
Built with **TypeScript**, **Node.js**, **Prisma**, and **Hono**.

🧩 Features
- 🔑 User Authentication (Login, Refresh Tokens)
- 🧠 Role-Based Access Control (RBAC)
- ⚙️ Fine-Grained Permissions
- 🗂️ Role & Permission Management API
- 🧾 OpenAPI / Scalar Docs Integration
- 🧱 Modular and scalable architecture

---

## 🚀 Getting Started

### 1️⃣ Setup your DB
```bash
psql -U postgres
CREATE DATABASE hono_auth_rbac;
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Generate Prisma client
```bash
npx prisma generate
```

### 4️⃣ Seed the database
```bash
npm run db:seed
```

### 5️⃣ Start the development server
```bash
npm run dev
```


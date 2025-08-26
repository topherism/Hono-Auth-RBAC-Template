# 📦 Prisma ORM Guide

Prisma is a **TypeScript ORM** (Object Relational Mapper) that makes it easy to work with databases like PostgreSQL, MySQL, SQLite, MongoDB, etc.  
It provides **type-safe queries**, migrations, and schema management.

---

## 🚀 Setup

### 1. Install Prisma
```bash
bun add @prisma/client
bun add -d prisma
```

- `@prisma/client` → generated client you’ll use in code  
- `prisma` → CLI tool for migrations & schema management  

---

### 2. Initialize Prisma
```bash
npx prisma init
```

This creates:
- `prisma/schema.prisma` → your data models + db config  
- `.env` → where you store `DATABASE_URL`

---

### 3. Configure Database (example: PostgreSQL)
In `.env`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/mydb?schema=public"
```

In `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // loads from .env
}

generator client {
  provider = "prisma-client-js"
}
```

---

## 🏗️ Defining Models

Example `User` model:
```prisma
model User {
  id        Int      @id @default(autoincrement())  // Primary key
  email     String   @unique                       // Unique constraint
  password  String
  posts     Post[]                                // Relation (1:n with Post)
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
}
```

---

## 🔄 Migrations

### Create your first migration
```bash
npx prisma migrate dev --name init
```
- Applies schema changes to your database  
- Creates a new migration file in `prisma/migrations/`  
- Keeps track of DB versioning  

### Add new models later
```bash
npx prisma migrate dev --name add_post_model
```

### Reset DB (⚠️ dev only, clears data)
```bash
npx prisma migrate reset
```

---

## 🛠️ Generating Client

Every time schema changes, regenerate Prisma Client:
```bash
npx prisma generate
```

Then use in code:
```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users = await prisma.user.findMany()
```

---

## 🔍 Exploring Data

Prisma Studio (visual DB browser):
```bash
npx prisma studio
```
Runs on [http://localhost:5555](http://localhost:5555)

---

## 📘 Common Queries

### Create
```ts
await prisma.user.create({
  data: {
    email: "test@example.com",
    password: "hashed_password",
  },
})
```

### Read
```ts
const users = await prisma.user.findMany()
```

### Update
```ts
await prisma.user.update({
  where: { id: 1 },
  data: { email: "new@example.com" },
})
```

### Delete
```ts
await prisma.user.delete({ where: { id: 1 } })
```

### Relations
```ts
const posts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true },
})
```

---

## 🧰 Other Useful Commands

```bash
npx prisma format     # format schema.prisma
npx prisma validate   # check schema for errors
npx prisma db pull    # introspect existing db -> schema.prisma
npx prisma db push    # push schema to db (without migrations, dev only)
```

---

## ⚠️ Notes

- Always use **migrations** (`migrate dev`) in dev/prod for version tracking  
- Use `db push` only for quick prototyping (no migration history)  
- Prisma works best with **relational DBs** (Postgres, MySQL, SQLite)  
- All queries are **type-safe** and **auto-complete in VSCode**  

---

## ✅ Summary

Prisma gives you:
- Schema as the **single source of truth**  
- Auto-generated, **type-safe client**  
- Easy DB migrations with versioning  
- Built-in DB admin tool (Prisma Studio)  

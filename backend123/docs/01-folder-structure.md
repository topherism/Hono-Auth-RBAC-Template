# Folder Structure

This is the main organization of the template:

src/
├─ constants/
│ ├─ http.ts # Common HTTP status codes
│ ├─ errors.ts # Centralized error messages
│ └─ success.ts # Centralized success messages
│
├─ utils/
│ ├─ response.ts # Standardized response functions
│ └─ logger.ts # Pino logger instance
│
├─ middleware/
│ └─ errorHandler.ts # Global error middleware (optional)
│
└─ index.ts # App entry point


- Keeps things organized and reusable.
- Each folder has a single responsibility.


src/
 ├── app.ts                # Hono app instance
 ├── server.ts             # Server entrypoint

 ├── routes/               # API endpoints (Hono routers)
 │    └── users.routes.ts

 ├── constants/          
 │    └── http.ts  # Common HTTP status codes
 │    └── errors.ts # Centralized error messages
 │    └── success.ts # Centralized success messages

 ├── controllers/          # Request/response handlers
 │    └── users.controller.ts

 ├── services/             # Business logic (use cases)
 │    └── users.service.ts

 ├── repositories/         # Data access layer (Prisma)
 │    └── users.repository.ts

 ├── schemas/              # Zod validation schemas
 │    └── users.schema.ts

 ├── middlewares/          # Auth, logging, rate limit, etc.
 │    └── authentication.middleware.ts

 ├── utils/                # Shared helpers
 │    └── response.ts

 └── prisma/               # Prisma schema + client
      ├── schema.prisma
      └── client.ts

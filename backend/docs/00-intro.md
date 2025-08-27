# Dynamic API Response System

This project provides a **scalable and consistent pattern** for building APIs with Hono.  

## Features
- Standardized API responses (`success`, `error`, `custom`)
- Centralized error handling
- Predefined HTTP codes, errors, and success messages
- Structured logging with Pino
- Production-ready & development-friendly

---

src/
 ├── routes/        → Hono routers (grouping endpoints)
 ├── controllers/   → Handle req/res, validation
 ├── services/      → Business logic (optional but good for complex apps)
 ├── repositories/  → Prisma data access
 ├── middlewares/   → Auth, logging, etc.
 ├── utils/         → Shared helpers


## Architecture Flow

```text
   ┌────────────┐        ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
   │   Client   │  -->   │  Controller   │  -->   │    Service     │  -->   │  Repository   │
   └────────────┘        └───────────────┘        └───────────────┘        └───────────────┘
                              │                        │                        │
                              ▼                        ▼                        ▼
                       (Speak to client)       (Think & decide)         (Talk to database)

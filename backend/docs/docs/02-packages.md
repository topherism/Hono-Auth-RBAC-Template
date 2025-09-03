# Required Packages

### Runtime
- bun

### Framework
- hono

### Validation
- zod
- @hono/zod-validator

### Environment
- dotenv

### Logging
- pino
- pino-pretty (for dev)

### Optional Dev Types
- @types/bun

COPY AND PASTE 
bun add hono zod @hono/zod-validator dotenv pino
bun add -d pino-pretty @types/bun
bun add pg prisma @prisma/client
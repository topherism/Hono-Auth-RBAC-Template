## 🏗 Typical layering

### Route definitions (`tasks.routes.ts`)
- Define the OpenAPI schema (paths, request/response).
- No business logic.

### Handlers (`tasks.handlers.ts`)
- Act like controllers.
- Receive validated inputs from `c.req.valid`.
- Call a service/repository.
- Return HTTP responses (`c.json`, `c.body`).

### Repositories (optional)
- Pure DB access layer.
- Wrap Prisma queries (`findMany`, `create`, `update`, `delete`).
- No knowledge of HTTP.

### Services (optional)
- Business logic (e.g., *“mark task complete and notify user”*).
- Use repositories under the hood.
- Reusable across HTTP handlers, jobs, etc.

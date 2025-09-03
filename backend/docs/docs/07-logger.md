
#### 07-logger.md
```markdown

# Logger (Pino)

`src/utils/logger.ts`:

Dev: human-readable colored logs

Prod: structured JSON logs suitable for log collectors

```ts
import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
  transport: isDev ? { target: "pino-pretty", options: { colorize: true } } : undefined
});


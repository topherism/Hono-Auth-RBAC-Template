
#### 04-error-messages.md
```markdown
# Error Messages

`src/constants/errors.ts` centralizes all error responses:

```ts
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: { status: 401, message: "Invalid email or password.", code: "INVALID_CREDENTIALS" },
  BAD_REQUEST: { status: 400, message: "Invalid request data.", code: "BAD_REQUEST" },
  INTERNAL_ERROR: { status: 500, message: "Something went wrong.", code: "INTERNAL_ERROR" }
};


#### 05-success-messages.md
```markdown
# Success Messages

`src/constants/success.ts` centralizes all success responses:

```ts
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: { status: 201, message: "User registered successfully.", code: "USER_REGISTERED" },
  RESOURCE_FETCHED: { status: 200, message: "Resource fetched successfully.", code: "RESOURCE_FETCHED" }
};

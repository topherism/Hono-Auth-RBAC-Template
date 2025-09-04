# 📖 Common HTTP Status Codes

This is a practical list of the most commonly used HTTP status codes, with descriptions and example use cases.

---

## ✅ 2xx — Success

- **200 OK**  
  Standard success.  
  *Example:* `GET /users/123` → returns user data.

- **201 Created**  
  A new resource was created successfully.  
  *Example:* `POST /users` → new user registered.

- **202 Accepted**  
  Request accepted but still processing (asynchronous).  
  *Example:* Email queued for sending.

- **204 No Content**  
  Success, but no response body.  
  *Example:* `DELETE /users/123`.

---

## 🔁 3xx — Redirection

- **301 Moved Permanently**  
  Resource moved to a new URL.  
  *Example:* Old blog link redirects to new domain.

- **302 Found**  
  Temporary redirect.  
  *Example:* Redirect after login.

- **304 Not Modified**  
  Cached version is still valid.  
  *Example:* Browser reuses cached assets.

---

## ❌ 4xx — Client Errors

- **400 Bad Request**  
  Invalid or malformed request.  
  *Example:* Sending broken JSON.

- **401 Unauthorized**  
  Authentication required or invalid.  
  *Example:* Missing or expired JWT token.

- **403 Forbidden**  
  Authenticated but not allowed.  
  *Example:* Non-admin accessing admin-only route.

- **404 Not Found**  
  Resource doesn’t exist.  
  *Example:* `GET /users/9999` when user doesn’t exist.

- **409 Conflict**  
  Request conflicts with current state.  
  *Example:* Trying to register with an email that already exists.

- **422 Unprocessable Entity**  
  Validation failed.  
  *Example:* Password too short, invalid email format.

- **429 Too Many Requests**  
  Rate limit exceeded.  
  *Example:* Too many login attempts.

---

## 💥 5xx — Server Errors

- **500 Internal Server Error**  
  Generic server crash or unhandled error.  
  *Example:* Unexpected exception in backend.

- **502 Bad Gateway**  
  Upstream service failed.  
  *Example:* Proxy (Nginx) can’t reach app.

- **503 Service Unavailable**  
  Server overloaded or down for maintenance.  
  *Example:* Service temporarily offline.

- **504 Gateway Timeout**  
  Upstream service took too long to respond.  
  *Example:* Database query timeout.

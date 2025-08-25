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

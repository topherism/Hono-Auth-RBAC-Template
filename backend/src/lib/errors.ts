// errors.ts
export class AppError extends Error {
  statusCode: number; // keep number

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  toResponse() {
    return {message: this.message };
  }
}

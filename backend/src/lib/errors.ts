// src/lib/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

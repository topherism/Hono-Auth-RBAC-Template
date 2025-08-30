import bcrypt from "bcryptjs";

export class BcryptHelper {
  // Number of salt rounds; 10–12 is standard for modern apps
  private static SALT_ROUNDS = 10;

  // Hash a plaintext string
  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  }

  // Verify plaintext against a hashed value
  static async verify(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}

import { AuthRepository } from "@/repositories/auth.repository";
import { BcryptHelper } from "@/utils/hash";


export const AuthService = {
  async register(email: string, password: string, username?: string) {
    const existingUser = await AuthRepository.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashPassword = await BcryptHelper.hash(password);

    const user = await AuthRepository.createUser(email, hashPassword, username);

    return user;
  },

  //   async login(email: string, password: string) {
  //     const user = await AuthRepository.findUserByEmail(email);
  //     if (!user) throw new Error("Invalid credentials");

  //     const valid = await bcrypt.compare(password, user.password);
  //     if (!valid) throw new Error("Invalid credentials");

  //     const token = auth.sign({ userId: user.id });
  //     return { user, token };
  //   },
};

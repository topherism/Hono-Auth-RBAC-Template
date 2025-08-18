export const signup = async ({ email, password }: { email: string; password: string }) => {
  // TODO: Save user with hashed password
  return { message: 'User registered', email }
}

export const login = async ({ email, password }: { email: string; password: string }) => {
  // TODO: Check user, return JWT
  return { message: 'Login successful', token: 'fake-jwt-token' }
}

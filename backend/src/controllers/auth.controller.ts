import { Context } from 'hono'
import * as AuthService from '../services/auth.service'

export const signup = async (c: Context) => {
  const body = await c.req.json()
  const result = await AuthService.signup(body)
  return c.json(result, 201)
}

export const login = async (c: Context) => {
  const body = await c.req.json()
  const result = await AuthService.login(body)
  return c.json(result, 200)
}

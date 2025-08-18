import { Hono } from 'hono'
import * as AuthController from '../controllers/auth.controller'

const auth = new Hono()

auth.post('/signup', AuthController.signup)
auth.post('/login', AuthController.login)

export default auth

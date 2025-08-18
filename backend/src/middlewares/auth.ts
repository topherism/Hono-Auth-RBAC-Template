// src/middlewares/auth.ts
import { Hono } from 'hono'
import { verifyToken } from '../utils/jwt'
import { prisma } from '../db'

export const authMiddleware = (requiredRoles: string[] = [], requiredPrivileges: string[] = []) => {
  return async (c: any, next: any) => {
    try {
      const authHeader = c.req.header('Authorization')
      if (!authHeader) return c.json({ message: 'Unauthorized' }, 401)

      const token = authHeader.replace('Bearer ', '')
      const { payload } = await verifyToken(token)

      const user = await prisma.user.findUnique({
        where: { id: Number(payload.userId) }
      })

      if (!user) return c.json({ message: 'User not found' }, 404)

      // Check roles
      if (requiredRoles.length && !user.roles.some((r) => requiredRoles.includes(r))) {
        // Check privileges
        if (!requiredPrivileges.some((p) => user.privileges.includes(p))) {
          return c.json({ message: 'Forbidden' }, 403)
        }
      }

      c.set('user', user)
      await next()
    } catch (err) {
      return c.json({ message: 'Invalid token' }, 401)
    }
  }
}

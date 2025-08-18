// // src/routes/admin.ts
// import { Hono } from 'hono'
// import { authMiddleware } from '../middlewares/auth'

// const admin = new Hono()

// // Only admins can access this page
// admin.get('/dashboard', authMiddleware(['ADMIN']), (c) => {
//   const user = c.get('user')
//   return c.json({ message: `Welcome Admin ${user.username}` })
// })

// // Or coordinators with special privilege
// admin.get('/reports', authMiddleware([], ['VIEW_ADMIN_DASHBOARD']), (c) => {
//   const user = c.get('user')
//   return c.json({ message: `Access granted for ${user.username}` })
// })

// export default admin

import { Hono } from 'hono';
import authRoutes from '../routes/auth.routes';
// import usersRoutes from '../routes/users.routes';
// import inventoryRoutes from '../routes/inventory.routes';

const docApp = new Hono();

// Mount all API route modules here
docApp.route('/api/auth', authRoutes);
// docApp.route('/users', usersRoutes);
// docApp.route('/inventory', inventoryRoutes);

export default docApp;

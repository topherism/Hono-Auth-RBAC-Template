import usersRoutes from "./users/routes";
import productRoutes from "./products/routes";

export const routes = [usersRoutes, productRoutes] as const;

export type AppRoutes = (typeof routes)[number];

import { Hono, type Context } from "hono";

export function getProductsController(c: Context) {
  return c.text("Hello Products!");
}

export function getProductController(c: Context) {
  const { id } = c.req.param();
  const { name } = c.req.query();
  return c.text(`Hello Products ${id} ${name}!`);
}

export async function createProductController(c: Context) {
  const { authorization } = c.req.header();
  const { name, age } = await c.req.json();
  return c.text(`Create Products! ${JSON.stringify(authorization)}
  ${name} ${age}`);
}

export function deleteProductController(c: Context) {
  return c.text("Delete Products!");
}

export function updateProductController(c: Context) {
  return c.text("Update Products!");
}

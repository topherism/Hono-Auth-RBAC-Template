import { prisma } from "@/lib/prisma"

export function findAll() {
  return prisma.user.findMany()
}

export function findById(id: number) {
  return prisma.user.findUnique({ where: { id } })
}

export function create(data: { name: string; email: string }) {
  return prisma.user.create({ data })
}

export function update(id: number, data: { name?: string; email?: string }) {
  return prisma.user.update({ where: { id }, data })
}

export function remove(id: number) {
  return prisma.user.delete({ where: { id } })
}

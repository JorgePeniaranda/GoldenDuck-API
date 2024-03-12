import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient().$extends({
  model: {
    $allModels: {
      delete: () => 'query disabled',
      deleteMany: () => 'query disabled'
    }
  }
})

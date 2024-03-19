import { prisma } from '@/libs/prisma'
import { type ErrorRepository } from '../../domain/error.repository'
import { type ErrorEntity } from '../../domain/error.entity'
import { Error } from '../../domain/error.value'

export class PrismaRepository implements ErrorRepository {
  public async createError ({
    name,
    message
  }: {
    name: ErrorEntity['name']
    message: ErrorEntity['message']
  }): Promise<Error> {
    const createdError = await prisma.error.create({
      data: {
        name: name?.value,
        message: message?.value
      }
    })

    return new Error(createdError)
  }

  public async getAllError (): Promise<Error[]> {
    const categories = await prisma.error.findMany()

    return categories.map((error) => new Error(error))
  }

  public async findError ({
    id
  }: {
    id?: ErrorEntity['id']
  }): Promise<Error | null> {
    const error = await prisma.error.findUnique({
      where: {
        id: id?.value
      }
    })

    return error === null ? null : new Error(error)
  }

  public async deleteError ({ id }: { id: ErrorEntity['id'] }): Promise<void> {
    await prisma.category.delete({
      where: {
        id: id.value
      }
    })
  }
}

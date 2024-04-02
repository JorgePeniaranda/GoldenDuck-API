import { PrismaService } from '@/core/shared/prisma.repository'
import { Injectable } from '@nestjs/common'
import { type CreateErrorDTO } from '../domain/dto/create-error'
import { Error } from '../domain/error.entity'
import { type ErrorPrimitive } from '../domain/error.primitive'
import { type ErrorRepository } from '../domain/error.repository'

@Injectable()
export class ErrorRepositoryPrismaMySQL implements ErrorRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: CreateErrorDTO): Promise<Error> {
    const newTransaction = await this.prisma.error.create({
      data
    })

    return new Error(newTransaction)
  }

  public async getAll (): Promise<Error[] | null> {
    const errors = await this.prisma.error.findMany()

    return errors.map(error => new Error(error))
  }

  public async find (id: ErrorPrimitive['id']): Promise<Error | null> {
    const error = await this.prisma.error.findUnique({
      where: {
        id
      }
    })

    return error !== null ? new Error(error) : null
  }

  public async delete (id: ErrorPrimitive['id']): Promise<void> {
    await this.prisma.error.delete({
      where: {
        id
      }
    })
  }
}

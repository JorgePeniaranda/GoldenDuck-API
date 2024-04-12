import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Error } from '../domain/error.entity'
import { type ErrorPrimitive } from '../domain/error.primitive'
import { type ErrorRepository } from '../domain/error.repository'

@Injectable()
export class ErrorRepositoryPrismaMySQL implements ErrorRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: Error): Promise<Error> {
    const newTransaction = await this.prisma.error.create({
      data: {
        ...data.toJSON(),
        id: undefined
      }
    })

    return new Error(newTransaction)
  }

  public async findAll (): Promise<Error[]> {
    const errors = await this.prisma.error.findMany(
      {
        where: {
          deleted: false
        }
      }
    )

    return errors.map(error => new Error(error))
  }

  public async findOne ({ id }: { id: ErrorPrimitive['id'] }): Promise<Error | null> {
    const error = await this.prisma.error.findUnique({
      where: {
        id,
        deleted: false
      }
    })

    return error !== null ? new Error(error) : null
  }

  public async delete (data: Error): Promise<void> {
    await this.prisma.error.update({
      where: {
        id: data.id,
        deleted: false
      },
      data: {
        deleted: true
      }
    })
  }
}

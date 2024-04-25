import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Code } from '../domain/code.entity'
import { type CodePrimitive } from '../domain/code.primitive'
import { type CategoryRepository } from '../domain/code.repository'

@Injectable()
export class CodeRepositoryPrismaMySQL implements CategoryRepository {
  constructor (private readonly prisma: PrismaService) {}

  /* ---------- create ---------- */ // MARK: create
  public async create (data: Code): Promise<Code> {
    const code = await this.prisma.code.create({
      data: {
        ...data.toJSON(),
        id: undefined
      }
    })

    return new Code(code)
  }

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({ idUser }: { idUser: CodePrimitive['idUser'] }): Promise<Code[]> {
    const codes = await this.prisma.code.findMany({
      where: {
        idUser,
        expiredAt: {
          gte: new Date()
        }
      }
    })

    return codes.map(code => new Code(code))
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    idUser,
    index
  }: {
    idUser: CodePrimitive['idUser']
    index: number
  }): Promise<Code | null> {
    const code = await this.prisma.code.findMany({
      where: {
        idUser,
        expiredAt: {
          gte: new Date()
        },
        expired: false
      },
      skip: index,
      take: 1
    })

    return code[0] !== undefined ? new Code(code[0]) : null
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findByID ({ id }: { id: CodePrimitive['id'] }): Promise<Code | null> {
    const code = await this.prisma.code.findUnique({
      where: {
        id
      }
    })

    return code !== null ? new Code(code) : null
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete (data: Code): Promise<void> {
    await this.prisma.code.update({
      where: data.toJSON(),
      data: {
        expired: true,
        expiredAt: new Date()
      }
    })
  }

  /* ---------- deleteAll ---------- */ // MARK: deleteAll
  public async deleteAll ({ idUser }: { idUser: CodePrimitive['idUser'] }): Promise<void> {
    await this.prisma.code.updateMany({
      where: {
        idUser
      },
      data: {
        expired: true,
        expiredAt: new Date()
      }
    })
  }
}

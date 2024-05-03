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

  /* ---------- findLast ---------- */ // MARK: findLast
  public async findLast ({ idUser }: { idUser: CodePrimitive['idUser'] }): Promise<Code | null> {
    const code = await this.prisma.code.findMany({
      where: {
        idUser,
        expiredAt: {
          gte: new Date()
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 1
    })

    return code[0] !== undefined ? new Code(code[0]) : null
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

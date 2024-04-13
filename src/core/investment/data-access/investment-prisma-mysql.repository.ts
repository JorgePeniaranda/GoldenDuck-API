import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Investment } from '../domain/investment.entity'
import { type InvestmentPrimitive } from '../domain/investment.primitive'
import { type InvestmentRepository } from '../domain/investment.repository'

@Injectable()
export class InvestmentRepositoryPrismaMySQL implements InvestmentRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: Investment): Promise<Investment> {
    const investment = await this.prisma.investment.create({
      data: data.toJSON()
    })

    return new Investment(investment)
  }

  public async findAll ({
    idAccount
  }: {
    idAccount: InvestmentPrimitive['idAccount']
  }): Promise<Investment[]> {
    const investments = await this.prisma.investment.findMany({
      where: {
        idAccount
      }
    })

    return investments.map(investment => new Investment(investment))
  }

  public async findOne ({
    idAccount,
    index
  }: {
    idAccount: InvestmentPrimitive['idAccount']
    index: number
  }): Promise<Investment | null> {
    const investment = await this.prisma.investment.findMany({
      where: {
        idAccount
      },
      skip: index,
      take: 1
    })

    return investment[0] !== undefined ? new Investment(investment[0]) : null
  }

  public async findByID ({
    id
  }: {
    id: InvestmentPrimitive['idAccount']
  }): Promise<Investment | null> {
    const investment = await this.prisma.investment.findUnique({
      where: {
        id
      }
    })

    return investment !== null ? new Investment(investment) : null
  }

  public async delete (data: Investment): Promise<void> {
    await this.prisma.investment.update({
      where: {
        ...data.toJSON(),
        canceled: false
      },
      data: {
        canceled: true
      }
    })
  }
}

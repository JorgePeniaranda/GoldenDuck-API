import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { PrismaService } from '@/core/shared/prisma.repository'
import { Injectable } from '@nestjs/common'
import { type CreateInvestmentDTO } from '../domain/dto/create-loan'
import { Investment } from '../domain/investment.entity'
import { type InvestmentPrimitive } from '../domain/investment.primitive'
import { type InvestmentRepository } from '../domain/investment.repository'

@Injectable()
export class InvestmentRepositoryPrismaMySQL implements InvestmentRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: CreateInvestmentDTO): Promise<Investment> {
    const newInvestment = await this.prisma.loan.create({
      data
    })

    return new Investment(newInvestment)
  }

  public async getAll (idAccount: AccountPrimitive['id']): Promise<Investment[] | null> {
    const investments = await this.prisma.loan.findMany({
      where: {
        idAccount
      }
    })

    return investments.map(investment => new Investment(investment))
  }

  public async find (id: InvestmentPrimitive['id']): Promise<Investment | null> {
    const investment = await this.prisma.loan.findUnique({
      where: {
        id
      }
    })

    return investment !== null ? new Investment(investment) : null
  }

  public async delete (id: InvestmentPrimitive['id']): Promise<void> {
    await this.prisma.loan.delete({
      where: {
        id
      }
    })
  }
}

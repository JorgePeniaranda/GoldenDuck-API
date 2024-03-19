import { prisma } from '@/libs/prisma'
import { type InvestmentRepository } from '../../domain/investment.repository'
import { type InvestmentEntity } from '../../domain/investment.entity'
import { Investment } from '../../domain/investment.value'

export class PrismaRepository implements InvestmentRepository {
  public async createInvestment ({
    idAccount,
    amount,
    interest,
    dateEnd
  }: {
    idAccount: InvestmentEntity['idAccount']
    amount: InvestmentEntity['amount']
    interest: InvestmentEntity['interest']
    dateEnd: InvestmentEntity['dateEnd']
  }): Promise<Investment> {
    const createdInvestment = await prisma.investment.create({
      data: {
        idAccount: idAccount.value,
        amount: amount.value,
        interest: interest.value,
        dateEnd: dateEnd.value
      }
    })

    return new Investment(createdInvestment)
  }

  public async getAllInvestment (idAccount?: InvestmentEntity['idAccount']): Promise<Investment[] | null> {
    const investments = await prisma.investment.findMany({
      where: {
        idAccount: idAccount?.value
      }
    })

    return investments.map((investment) => new Investment(investment))
  }

  public async findInvestment ({
    id
  }: {
    id?: InvestmentEntity['id']
  }): Promise<Investment | null> {
    const investment = await prisma.investment.findFirst({
      where: {
        id: id?.value
      }
    })

    return investment === null ? null : new Investment(investment)
  }

  public async cancelInvestment ({ id }: { id: InvestmentEntity['id'] }): Promise<void> {
    await prisma.investment.update({
      where: {
        id: id.value
      },
      data: {
        canceled: true
      }
    })
  }
}

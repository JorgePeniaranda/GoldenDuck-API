import { prisma } from '@/libs/prisma'
import { type LoanRepository } from '../../domain/loan.repository'
import { type LoanEntity } from '../../domain/loan.entity'
import { Loan } from '../../domain/loan.value'

export class PrismaRepository implements LoanRepository {
  public async createLoan ({
    idAccount,
    amount,
    interest,
    dateEnd
  }: {
    idAccount: LoanEntity['idAccount']
    amount: LoanEntity['amount']
    interest: LoanEntity['interest']
    dateEnd: LoanEntity['dateEnd']
  }): Promise<Loan> {
    const createdLoan = await prisma.loan.create({
      data: {
        idAccount: idAccount.value,
        amount: amount.value,
        interest: interest.value,
        dateEnd: dateEnd.value
      }
    })

    return new Loan(createdLoan)
  }

  public async getAllLoan (
    idAccount?: LoanEntity['idAccount']
  ): Promise<Loan[] | null> {
    const loans = await prisma.loan.findMany({
      where: {
        idAccount: idAccount?.value
      }
    })

    return loans.map((loan) => new Loan(loan))
  }

  public async findLoan ({
    id
  }: {
    id?: LoanEntity['id']
  }): Promise<Loan | null> {
    const loan = await prisma.loan.findFirst({
      where: {
        id: id?.value
      }
    })

    return loan === null ? null : new Loan(loan)
  }

  public async cancelLoan (
    id: LoanEntity['id']
  ): Promise<void> {
    await prisma.loan.update({
      where: {
        id: id.value
      },
      data: {
        canceled: true
      }
    })
  }
}

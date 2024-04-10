import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { type CreateLoanDTO } from '../domain/dto/create-loan'
import { Loan } from '../domain/loan.entity'
import { type LoanPrimitive } from '../domain/loan.primitive'
import { type LoanRepository } from '../domain/loan.repository'

@Injectable()
export class LoanRepositoryPrismaMySQL implements LoanRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: CreateLoanDTO): Promise<Loan> {
    const newLoan = await this.prisma.loan.create({
      data
    })

    return new Loan(newLoan)
  }

  public async getAll (
    idAccount: AccountPrimitive['id']
  ): Promise<Loan[] | null> {
    const loans = await this.prisma.loan.findMany({
      where: {
        idAccount
      }
    })

    return loans.map(loan => new Loan(loan))
  }

  public async find (id: LoanPrimitive['id']): Promise<Loan | null> {
    const loan = await this.prisma.loan.findUnique({
      where: {
        id
      }
    })

    return loan !== null ? new Loan(loan) : null
  }

  public async delete (id: LoanPrimitive['id']): Promise<void> {
    await this.prisma.loan.delete({
      where: {
        id
      }
    })
  }
}

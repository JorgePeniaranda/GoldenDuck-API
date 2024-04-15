import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Loan } from '../domain/loan.entity'
import { type LoanPrimitive } from '../domain/loan.primitive'
import { type LoanRepository } from '../domain/loan.repository'

@Injectable()
export class LoanRepositoryPrismaMySQL implements LoanRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: Loan): Promise<Loan> {
    const loan = await this.prisma.loan.create({
      data: data.toJSON()
    })

    return new Loan(loan)
  }

  public async findAll ({ idAccount }: { idAccount: LoanPrimitive['idAccount'] }): Promise<Loan[]> {
    const loans = await this.prisma.loan.findMany({
      where: {
        idAccount
      }
    })

    return loans.map(loan => new Loan(loan))
  }

  public async findOne ({
    idAccount,
    index
  }: {
    idAccount: LoanPrimitive['idAccount']
    index: number
  }): Promise<Loan | null> {
    const loan = await this.prisma.loan.findMany({
      where: {
        idAccount
      },
      skip: index,
      take: 1
    })

    return loan[0] !== undefined ? new Loan(loan[0]) : null
  }

  public async findByID ({ id }: { id: LoanPrimitive['idAccount'] }): Promise<Loan | null> {
    const loan = await this.prisma.loan.findUnique({
      where: {
        id
      }
    })

    return loan !== null ? new Loan(loan) : null
  }

  public async delete (data: Loan): Promise<void> {
    await this.prisma.loan.update({
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

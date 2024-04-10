import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { Inject, Injectable } from '@nestjs/common'
import { type CreateLoanDTO } from '../dto/create-loan'
import { type Loan } from '../loan.entity'
import { type LoanPrimitive } from '../loan.primitive'
import { LoanRepository } from '../loan.repository'

@Injectable()
export class LoanService {
  constructor (
    @Inject('LoanRepository') private readonly loanRepository: LoanRepository
  ) {}

  public async create (data: CreateLoanDTO): Promise<Loan> {
    return await this.loanRepository.create(data)

    // TO-DO: remove money from account
  }

  public async findAll (id: AccountPrimitive['id']): Promise<Loan[] | null> {
    return await this.loanRepository.findAll(id)
  }

  public async findOne (id: LoanPrimitive['id']): Promise<Loan | null> {
    return await this.loanRepository.findOne(id)
  }

  public async delete (id: LoanPrimitive['id']): Promise<void> {
    await this.loanRepository.delete(id)

    // TO-DO: add money to account
  }
}

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
  }

  public async getAll (id: AccountPrimitive['id']): Promise<Loan[] | null> {
    return await this.loanRepository.getAll(id)
  }

  public async find (id: LoanPrimitive['id']): Promise<Loan | null> {
    return await this.loanRepository.find(id)
  }

  public async delete (id: LoanPrimitive['id']): Promise<void> {
    await this.loanRepository.delete(id)
  }
}

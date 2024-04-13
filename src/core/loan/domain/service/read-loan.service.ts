import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type Loan } from '../loan.entity'
import { type LoanPrimitive } from '../loan.primitive'
import { LoanRepository } from '../loan.repository'

@Injectable()
export class ReadLoanService {
  constructor (
    private readonly readAccountService: ReadAccountService,
    @Inject('LoanRepository') private readonly loanRepository: LoanRepository
  ) {}

  public async findAll (idAccount: LoanPrimitive['idAccount']): Promise<Loan[]> {
    return await this.loanRepository.findAll({ idAccount })
  }

  public async findOne ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: LoanPrimitive['id']
    AccountIndex: number
    index: number
  }): Promise<Loan | null> {
    const account = await this.readAccountService.findOne({
      idUser,
      index: AccountIndex
    })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.loanRepository.findOne({ idAccount: account.id, index })
  }

  public async findByID (id: LoanPrimitive['id']): Promise<Loan | null> {
    return await this.loanRepository.findByID({ id })
  }
}

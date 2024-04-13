import { EventsMap } from '@/constants/events'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { LoanErrorsMessages } from '@/messages/error/loan'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { type CreateLoanDTO } from '../dto/create-loan'
import { Loan } from '../loan.entity'
import { type LoanPrimitive } from '../loan.primitive'
import { LoanRepository } from '../loan.repository'

@Injectable()
export class WriteLoanService {
  constructor (
    private readonly readAccountService: ReadAccountService,
    @Inject('LoanRepository') private readonly loanRepository: LoanRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  public async create (data: CreateLoanDTO): Promise<Loan> {
    const loan = Loan.create(data)

    this.eventEmitter.emit(EventsMap.LOAN_CREATED, loan)

    return await this.loanRepository.create(loan)

    // TO-DO: add event to event to add money to account when investment is finished
  }

  public async delete ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: LoanPrimitive['id']
    AccountIndex: number
    index: number
  }): Promise<void> {
    const account = await this.readAccountService.findOne({
      idUser,
      index: AccountIndex
    })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    const loan = await this.loanRepository.findOne({ idAccount: account.id, index })

    if (loan === null) {
      throw new NotFoundException(LoanErrorsMessages.NotFound)
    }

    await this.loanRepository.delete(loan)

    this.eventEmitter.emit(EventsMap.LOAN_CANCELLED, loan)
  }
}

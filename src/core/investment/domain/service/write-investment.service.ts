import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { InvestmentErrorsMessages } from '@/messages/error/investment'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type CreateInvestmentDTO } from '../dto/create-investment'
import { Investment } from '../investment.entity'
import { type InvestmentPrimitive } from '../investment.primitive'
import { InvestmentRepository } from '../investment.repository'

@Injectable()
export class WriteInvestmentService {
  constructor (
    @Inject('InvestmentRepository')
    private readonly investmentRepository: InvestmentRepository,
    private readonly readAccountService: ReadAccountService
  ) {}

  public async create (data: CreateInvestmentDTO): Promise<Investment> {
    const investment = Investment.create(data)

    return await this.investmentRepository.create(investment)

    // TO-DO: remove money from account
    // TO-DO: add event to event to add money to account when investment is finished
  }

  public async delete ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: InvestmentPrimitive['id']
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

    const investment = await this.investmentRepository.findOne({ idAccount: account.id, index })

    if (investment === null) {
      throw new NotFoundException(InvestmentErrorsMessages.NotFound)
    }

    await this.investmentRepository.delete(investment)

    // TO-DO: add money to account
  }
}

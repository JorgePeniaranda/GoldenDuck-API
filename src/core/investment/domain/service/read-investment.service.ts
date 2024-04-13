import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type Investment } from '../investment.entity'
import { type InvestmentPrimitive } from '../investment.primitive'
import { InvestmentRepository } from '../investment.repository'

@Injectable()
export class ReadInvestmentService {
  constructor (
    @Inject('InvestmentRepository')
    private readonly investmentRepository: InvestmentRepository,
    private readonly readAccountService: ReadAccountService
  ) {}

  public async findAll (idAccount: InvestmentPrimitive['idAccount']): Promise<Investment[]> {
    return await this.investmentRepository.findAll({ idAccount })
  }

  public async findOne ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: InvestmentPrimitive['id']
    AccountIndex: number
    index: number
  }): Promise<Investment | null> {
    const account = await this.readAccountService.findOne({
      idUser,
      index: AccountIndex
    })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.investmentRepository.findOne({ idAccount: account.id, index })
  }

  public async findByID (id: InvestmentPrimitive['id']): Promise<Investment | null> {
    return await this.investmentRepository.findByID({ id })
  }
}

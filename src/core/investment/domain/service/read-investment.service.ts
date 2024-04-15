import { EntitiesName } from '@/constants/entities'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { Messages } from '@/messages'
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

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({
    idUser,
    AccountIndex
  }: {
    idUser: InvestmentPrimitive['id']
    AccountIndex: number
  }): Promise<Investment[]> {
    const account = await this.readAccountService.findOne({
      idUser,
      index: AccountIndex
    })

    if (account === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return await this.investmentRepository.findAll({ idAccount: account.id })
  }

  /* ---------- findAllByIDAccount ---------- */ // MARK: findAllByIDAccount
  public async findAllByIDAccount ({
    idAccount
  }: {
    idAccount: InvestmentPrimitive['idAccount']
  }): Promise<Investment[]> {
    return await this.investmentRepository.findAll({ idAccount })
  }

  /* ---------- findOne ---------- */ // MARK: findOne
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
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    return await this.investmentRepository.findOne({ idAccount: account.id, index })
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID (id: InvestmentPrimitive['id']): Promise<Investment | null> {
    return await this.investmentRepository.findByID({ id })
  }
}

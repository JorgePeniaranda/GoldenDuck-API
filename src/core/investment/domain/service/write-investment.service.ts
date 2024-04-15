import { EntitiesName } from '@/constants/entities'
import { EventsMap } from '@/constants/events'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { Messages } from '@/messages'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { type CreateInvestmentDTO } from '../dto/create-investment'
import { Investment } from '../investment.entity'
import { type InvestmentPrimitive } from '../investment.primitive'
import { InvestmentRepository } from '../investment.repository'

@Injectable()
export class WriteInvestmentService {
  constructor (
    @Inject('InvestmentRepository')
    private readonly investmentRepository: InvestmentRepository,
    private readonly readAccountService: ReadAccountService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  /* ---------- create ---------- */ // MARK: create
  public async create (data: CreateInvestmentDTO): Promise<Investment> {
    const investment = Investment.create(data)

    this.eventEmitter.emit(EventsMap.INVESTMENT_CREATED, investment.toJSON())

    return await this.investmentRepository.create(investment)

    // TO-DO: add event to event to add money to account when investment is finished
  }

  /* ---------- delete ---------- */ // MARK: delete
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
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    const investment = await this.investmentRepository.findOne({ idAccount: account.id, index })

    if (investment === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.INVESTMENT))
    }

    await this.investmentRepository.delete(investment)

    this.eventEmitter.emit(EventsMap.INVESTMENT_CANCELLED, investment.toJSON())
  }
}

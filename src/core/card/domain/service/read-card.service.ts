import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type Card } from '../card.entity'
import { CardRepository } from '../card.repository'

@Injectable()
export class ReadCardService {
  constructor (
    private readonly readAccountService: ReadAccountService,
    @Inject('CardRepository') private readonly cardRepository: CardRepository
  ) {}

  public async findAll ({
    idUser,
    AccountIndex
  }: {
    idUser: AccountPrimitive['idUser']
    AccountIndex: number
  }): Promise<Card[] | null> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.cardRepository.findAll({ idAccount: account.id })
  }

  public async findOne ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    AccountIndex: number
    index: number
  }): Promise<Card | null> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    return await this.cardRepository.findOne({ idAccount: account.id, index })
  }
}

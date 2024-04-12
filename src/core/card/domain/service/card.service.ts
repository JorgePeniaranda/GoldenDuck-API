import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { CardErrorsMessages } from '@/messages/error/card'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Card } from '../card.entity'
import { CardRepository } from '../card.repository'
import { type CreateCardDTO } from '../dto/create-card'

@Injectable()
export class CardService {
  constructor (
    private readonly readAccountService: ReadAccountService,
    @Inject('CardRepository') private readonly cardRepository: CardRepository
  ) {}

  public async create ({
    idUser,
    AccountIndex,
    data
  }: {
    idUser: AccountPrimitive['idUser']
    AccountIndex: number
    data: CreateCardDTO
  }): Promise<Card> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    const card = Card.create({ ...data, idAccount: account.id })

    return await this.cardRepository.create(card)
  }

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

  public async delete ({
    idUser,
    AccountIndex,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    AccountIndex: number
    index: number
  }): Promise<void> {
    const account = await this.readAccountService.findOne({ idUser, index: AccountIndex })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    const card = await this.cardRepository.findOne({ idAccount: account.id, index })

    if (card === null) {
      throw new NotFoundException(CardErrorsMessages.NotFound)
    }

    await this.cardRepository.delete(card)
  }
}

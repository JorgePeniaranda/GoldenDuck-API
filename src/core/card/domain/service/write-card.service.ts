import { EntitiesName } from '@/constants/entities'
import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ReadAccountService } from '@/core/account/domain/service/read-account.service'
import { Messages } from '@/messages'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Card } from '../card.entity'
import { CardRepository } from '../card.repository'
import { type CreateCardDTO } from '../dto/create-card'

@Injectable()
export class WriteCardService {
  constructor (
    private readonly readAccountService: ReadAccountService,
    @Inject('CardRepository') private readonly cardRepository: CardRepository
  ) {}

  /* ---------- create ---------- */ // MARK: create
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
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    const card = Card.create({ ...data, idAccount: account.id })

    return await this.cardRepository.create(card)
  }

  /* ---------- delete ---------- */ // MARK: delete
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
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    const card = await this.cardRepository.findOne({ idAccount: account.id, index })

    if (card === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.CARD))
    }

    await this.cardRepository.delete(card)
  }
}

import { EntitiesName } from '@/constants/entities'
import { EventsMap } from '@/constants/events'
import { Messages } from '@/messages'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { Account } from '../account.entity'
import { type AccountPrimitive } from '../account.primitive'
import { AccountRepository } from '../account.repository'

@Injectable()
export class WriteAccountService {
  constructor (
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  /* ---------- create ---------- */ // MARK: create
  @OnEvent(EventsMap.CREATE_ACCOUNT)
  public async create ({ idUser }: { idUser: AccountPrimitive['idUser'] }): Promise<Account> {
    const account = Account.create({
      idUser
    })

    this.eventEmitter.emit(EventsMap.ACCOUNT_CREATED, account.toJSON())

    return await this.accountRepository.create(account)
  }

  /* ---------- increaseBalance ---------- */ // MARK: increaseBalance
  @OnEvent(EventsMap.ACCOUNT_INCREMENT_BALANCE)
  public async increaseBalance ({
    id,
    amount
  }: {
    id: AccountPrimitive['id']
    amount: AccountPrimitive['balance']
  }): Promise<Account> {
    const account = await this.accountRepository.findByID({ id })

    if (account === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    account.incrementBalance(BigInt(amount))

    return await this.accountRepository.update(account)
  }

  /* ---------- decrementBalance ---------- */ // MARK: decrementBalance
  @OnEvent(EventsMap.ACCOUNT_DECREMENT_BALANCE)
  public async decrementBalance ({
    id,
    amount
  }: {
    id: AccountPrimitive['id']
    amount: AccountPrimitive['balance']
  }): Promise<Account> {
    const account = await this.accountRepository.findByID({ id })

    if (account === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    account.decrementBalance(BigInt(amount))

    return await this.accountRepository.update(account)
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete ({
    idUser,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    index: number
  }): Promise<void> {
    const account = await this.accountRepository.findOne({ idUser, index })

    if (account === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.ACCOUNT))
    }

    this.eventEmitter.emit(EventsMap.ACCOUNT_DELETED, account.toJSON())

    await this.accountRepository.delete(account)
  }
}

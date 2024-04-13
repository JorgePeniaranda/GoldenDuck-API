import { EventsMap } from '@/constants/events'
import { AccountErrorsMessages } from '@/messages/error/account'
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

  @OnEvent(EventsMap.CREATE_ACCOUNT)
  public async create ({ idUser }: { idUser: AccountPrimitive['idUser'] }): Promise<Account> {
    const account = Account.create({
      idUser
    })

    this.eventEmitter.emit(EventsMap.ACCOUNT_CREATED, account.toJSON())

    return await this.accountRepository.create(account)
  }

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
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    account.incrementBalance(BigInt(amount))

    return await this.accountRepository.update(account)

    // TO-DO: send notification to user email
  }

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
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    account.decrementBalance(BigInt(amount))

    return await this.accountRepository.update(account)

    // TO-DO: send notification to user email
  }

  public async delete ({
    idUser,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    index: number
  }): Promise<void> {
    const account = await this.accountRepository.findOne({ idUser, index })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    this.eventEmitter.emit(EventsMap.ACCOUNT_DELETED, account.toJSON())

    await this.accountRepository.delete(account)
  }
}

import { EventsMap } from '@/constants/events'
import { AccountErrorsMessages } from '@/messages/error/account'
import { IChangeBalanceEvent } from '@/types/events'
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

    this.eventEmitter.emit(EventsMap.ACCOUNT_CREATED, account)

    return await this.accountRepository.create(account)
  }

  @OnEvent(EventsMap.INCREMENT_BALANCE)
  public async increaseBalance ({ id, amount }: IChangeBalanceEvent): Promise<Account> {
    const account = await this.accountRepository.findByID({ id })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    account.incrementBalance(amount)
    this.eventEmitter.emit(EventsMap.ACCOUNT_INCREMENT_BALANCE, account)

    return await this.accountRepository.update(account)

    // TO-DO: send notification to user email
  }

  @OnEvent(EventsMap.DECREMENT_BALANCE)
  public async decrementBalance ({ id, amount }: IChangeBalanceEvent): Promise<Account> {
    const account = await this.accountRepository.findByID({ id })

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.NotFound)
    }

    account.decrementBalance(amount)
    this.eventEmitter.emit(EventsMap.ACCOUNT_DECREMENT_BALANCE, account)

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

    this.eventEmitter.emit(EventsMap.ACCOUNT_DELETED, account)

    await this.accountRepository.delete(account)
  }
}

import { EventsMap } from '@/constants/events'
import { AccountErrorsMessages } from '@/messages/error/account'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Account } from '../account.entity'
import { type AccountPrimitive } from '../account.primitive'
import { AccountRepository } from '../account.repository'

@Injectable()
export class WriteAccountService {
  constructor (
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepository
  ) {}

  @OnEvent(EventsMap.USER_CREATED)
  public async create (idUser: AccountPrimitive['idUser']): Promise<Account> {
    const account = Account.create({
      idUser
    })

    return await this.accountRepository.create(account)

    // TO-DO: send notification to user email
  }

  @OnEvent(EventsMap.INCREMENT_BALANCE)
  public async increaseBalance (id: AccountPrimitive['id'], amount: AccountPrimitive['balance']): Promise<Account> {
    const account = await this.accountRepository.findByID(id)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.AccountNotFound)
    }

    account.incrementBalance(amount)

    return await this.accountRepository.update(account)

    // TO-DO: send notification to user email
  }

  @OnEvent(EventsMap.DECREMENT_BALANCE)
  public async decrementBalance (id: AccountPrimitive['id'], amount: AccountPrimitive['balance']): Promise<Account> {
    const account = await this.accountRepository.findByID(id)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.AccountNotFound)
    }

    account.decrementBalance(amount)

    return await this.accountRepository.update(account)

    // TO-DO: send notification to user email
  }

  public async delete (idUser: AccountPrimitive['idUser'], index: number): Promise<void> {
    const account = await this.accountRepository.findOne(idUser, index)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.AccountNotFound)
    }

    await this.accountRepository.delete(account)
  }
}

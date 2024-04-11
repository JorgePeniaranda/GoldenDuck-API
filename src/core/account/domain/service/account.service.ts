import { EventsMap } from '@/constants/events'
import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { AccountErrorsMessages } from '@/messages/error/account'
import { UserErrorsMessages } from '@/messages/error/user'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Account } from '../account.entity'
import { type AccountPrimitive } from '../account.primitive'
import { AccountRepository } from '../account.repository'
import { type CreateAccountDTO } from '../dto/create-account'

@Injectable()
export class AccountService {
  constructor (
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepository,
    private readonly readUserService: ReadUserService
  ) {}

  @OnEvent(EventsMap.USER_CREATED)
  public async create (data: CreateAccountDTO): Promise<Account> {
    const checkUser = await this.readUserService.findOneByID(data.idUser)

    if (checkUser === null) {
      throw new NotFoundException(UserErrorsMessages.UserNotFound)
    }

    const account = Account.create(data)

    return await this.accountRepository.create(account)

    // TO-DO: send notification to user email
  }

  public async findAll (idUser: AccountPrimitive['idUser']): Promise<Account[]> {
    return await this.accountRepository.findAll(idUser)
  }

  public async findOne (id: AccountPrimitive['id']): Promise<Account | null> {
    return await this.accountRepository.findOne(id)
  }

  @OnEvent(EventsMap.INCREMENT_BALANCE)
  public async increaseBalance (id: AccountPrimitive['id'], amount: AccountPrimitive['balance']): Promise<Account> {
    const account = await this.accountRepository.findOne(id)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.AccountNotFound)
    }

    account.incrementBalance(amount)

    return await this.accountRepository.update(account)

    // TO-DO: send notification to user email
  }

  @OnEvent(EventsMap.DECREMENT_BALANCE)
  public async decrementBalance (id: AccountPrimitive['id'], amount: AccountPrimitive['balance']): Promise<Account> {
    const account = await this.accountRepository.findOne(id)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.AccountNotFound)
    }

    account.decrementBalance(amount)

    return await this.accountRepository.update(account)

    // TO-DO: send notification to user email
  }

  public async delete (id: AccountPrimitive['id']): Promise<void> {
    const account = await this.accountRepository.findOne(id)

    if (account === null) {
      throw new NotFoundException(AccountErrorsMessages.AccountNotFound)
    }

    await this.accountRepository.delete(account)
  }
}

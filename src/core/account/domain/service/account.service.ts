import { type IDUserDTO } from '@/core/user/domain/dto/id-user.dto'
import { Inject, Injectable } from '@nestjs/common'
import { type Account } from '../account.entity'
import { type AccountPrimitive } from '../account.primitive'
import { AccountRepository } from '../account.repository'
import { type CreateAccountDTO } from '../dto/create-account'
import { type UpdateAccountDTO } from '../dto/update-account'

@Injectable()
export class AccountService {
  constructor (
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepository
  ) {}

  public async create (data: CreateAccountDTO): Promise<Account> {
    return await this.accountRepository.create(data)
  }

  public async getAll (id: IDUserDTO): Promise<Account[] | null> {
    return await this.accountRepository.getAll(id)
  }

  public async find (id: AccountPrimitive['id']): Promise<Account | null> {
    return await this.accountRepository.find(id)
  }

  public async update (
    id: AccountPrimitive['id'],
    account: UpdateAccountDTO
  ): Promise<Account> {
    return await this.accountRepository.update(id, account)
  }

  public async delete (id: AccountPrimitive['id']): Promise<void> {
    await this.accountRepository.delete(id)
  }
}

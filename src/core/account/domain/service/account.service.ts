import { type IDUserDTO } from '@/core/user/domain/dto/id-user.dto'
import { Inject, Injectable } from '@nestjs/common'
import { type Account } from '../account.entity'
import { AccountRepository } from '../account.repository'
import { type CreateAccountDTO } from '../dto/create-account'
import { type IDAccountDTO } from '../dto/id-account'
import { type UpdateAccountDTO } from '../dto/update-account'

@Injectable()
export class AccountService {
  constructor (@Inject('AccountRepository') private readonly accountRepository: AccountRepository) {}

  public async create (data: CreateAccountDTO): Promise<Account> {
    return await this.accountRepository.create(data)
  }

  public async getAll (id: IDUserDTO): Promise<Account[] | null> {
    return await this.accountRepository.getAll(id)
  }

  public async find (id: IDAccountDTO): Promise<Account | null> {
    return await this.accountRepository.find(id)
  }

  public async update (id: IDAccountDTO, account: UpdateAccountDTO): Promise<Account> {
    return await this.accountRepository.update(id, account)
  }

  public async delete (id: IDAccountDTO): Promise<void> {
    await this.accountRepository.delete(id)
  }
}

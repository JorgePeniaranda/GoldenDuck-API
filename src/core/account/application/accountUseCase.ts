import { RequestError } from '@/helpers/customErrors'
import { type AccountEntity } from '../domain/account.entity'
import { type AccountRepository } from '../domain/account.repository'
import { type Account } from '../domain/account.value'
import { ErrorsDictionary } from '@/messages/errors'
import { type UserEntity } from '@/core/user/domain/user.entity'

export class AccountUseCase {
  constructor (private readonly accountRepository: AccountRepository) {}

  public async create ({
    idUser
  }: {
    idUser: AccountEntity['idUser']
  }): Promise<Account> {
    const createdAccount = await this.accountRepository.createAccount({ idUser })

    return createdAccount
  }

  public async getAllAccount (idUser: UserEntity['id']): Promise<Account[] | null> {
    const accounts = await this.accountRepository.getAllAccounts(idUser)

    return accounts
  }

  public async findAccount (searchParams: {
    id?: AccountEntity['id']
  }): Promise<Account | null> {
    if (searchParams.id === undefined) {
      throw new RequestError(ErrorsDictionary.NoParams)
    }

    const account = await this.accountRepository.findAccount(searchParams)

    return account
  }

  public async update (account: Account): Promise<Account> {
    const updatedAccount = await this.accountRepository.updateAccount(account)

    return updatedAccount
  }

  public async delete (id: AccountEntity['id']): Promise<void> {
    await this.accountRepository.deleteAccount(id)
  }
}

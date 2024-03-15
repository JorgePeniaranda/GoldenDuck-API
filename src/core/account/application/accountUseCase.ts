import { RequestError } from '../../../helpers/customErrors'
import { ErrorsDictionary } from '../../../messages/errors'
import { type AccountEntity } from '../domain/account.entity'
import { type AccountRepository } from '../domain/account.repository'
import { type Account } from '../domain/account.value'

export class AccountUseCase {
  constructor (private readonly accountRepository: AccountRepository) {
    this.accountRepository = accountRepository
  }

  public async create (account: Account): Promise<Account> {
    const createdAccount = await this.accountRepository.createAccount(account)

    return createdAccount
  }

  public async update (account: Account): Promise<Account> {
    const updatedAccount = await this.accountRepository.updateAccount(account)

    return updatedAccount
  }

  public async delete (account: Account): Promise<void> {
    account.deleted = true

    await this.accountRepository.deleteAccount(account)
  }

  public async findUser (searchParams: {
    id?: AccountEntity['id']
  }): Promise<Account | null> {
    if (searchParams.id === undefined) {
      throw new RequestError(ErrorsDictionary.NoParams)
    }

    const account = await this.accountRepository.findAccount(searchParams)

    return account
  }
}

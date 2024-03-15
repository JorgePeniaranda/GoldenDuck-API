import { type AccountEntity } from './account.entity'
import { type Account } from './account.value'

export interface AccountRepository {
  createAccount: (account: Account) => Promise<Account>
  updateAccount: (account: Account) => Promise<Account>
  deleteAccount: (account: Account) => Promise<void>
  findAccount: ({
    id
  }: {
    id?: AccountEntity['id']
  }) => Promise<Account | null>
}

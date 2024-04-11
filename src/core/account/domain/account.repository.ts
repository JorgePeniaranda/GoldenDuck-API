import { type Account } from './account.entity'
import { type AccountPrimitive } from './account.primitive'

export interface AccountRepository {
  create: (data: Account) => Promise<Account>
  findAll: (id: AccountPrimitive['idUser']) => Promise<Account[]>
  findOne: (id: AccountPrimitive['id']) => Promise<Account | null>
  update: (data: Account) => Promise<Account>
  delete: (data: Account) => Promise<void>
}

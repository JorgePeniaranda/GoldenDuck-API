import { type IDUserDTO } from '@/core/user/domain/dto/id-user.dto'
import { type Account } from './account.entity'
import { type AccountPrimitive } from './account.primitive'
import { type CreateAccountDTO } from './dto/create-account'
import { type UpdateAccountDTO } from './dto/update-account'

export interface AccountRepository {
  create: (account: CreateAccountDTO) => Promise<Account>
  getAll: (id: IDUserDTO) => Promise<Account[] | null>
  find: (id: AccountPrimitive['id']) => Promise<Account | null>
  update: (id: AccountPrimitive['id'], account: UpdateAccountDTO) => Promise<Account>
  delete: (id: AccountPrimitive['id']) => Promise<void>
}

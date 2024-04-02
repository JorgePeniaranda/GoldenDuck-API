import { type IDUserDTO } from '@/core/user/domain/dto/id-user.dto'
import { type Account } from './account.entity'
import { type CreateAccountDTO } from './dto/create-account'
import { type IDAccountDTO } from './dto/id-account'
import { type UpdateAccountDTO } from './dto/update-account'

export interface AccountRepository {
  create: (account: CreateAccountDTO) => Promise<Account>
  getAll: (id: IDUserDTO) => Promise<Account[] | null>
  find: (id: IDAccountDTO) => Promise<Account | null>
  update: (id: IDAccountDTO, account: UpdateAccountDTO) => Promise<Account>
  delete: (id: IDAccountDTO) => Promise<void>
}

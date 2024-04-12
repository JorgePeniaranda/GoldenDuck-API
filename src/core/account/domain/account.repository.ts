import { type Account } from './account.entity'
import { type AccountPrimitive } from './account.primitive'

export interface AccountRepository {
  create: (data: Account) => Promise<Account>
  findAll: ({ idUser }: { idUser: AccountPrimitive['idUser'] }) => Promise<Account[]>
  findOne: ({
    idUser,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    index: number
  }) => Promise<Account | null>
  findByID: ({ id }: { id: AccountPrimitive['id'] }) => Promise<Account | null>
  update: (data: Account) => Promise<Account>
  delete: (data: Account) => Promise<void>
}

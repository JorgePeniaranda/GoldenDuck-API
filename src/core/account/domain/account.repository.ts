import { type UserEntity } from '@/core/user/domain/user.entity'
import { type AccountEntity } from './account.entity'
import { type Account } from './account.value'

export interface AccountRepository {
  createAccount: ({
    idUser,
    imgUrl
  }: {
    idUser: AccountEntity['idUser']
    imgUrl?: AccountEntity['imgUrl']
  }) => Promise<Account>
  getAllAccounts: (idUser: UserEntity['id']) => Promise<Account[] | null>
  findAccount: ({ id }: { id?: AccountEntity['id'] }) => Promise<Account | null>
  updateAccount: ({
    id,
    imgUrl
  }: {
    id: AccountEntity['id']
    imgUrl: AccountEntity['imgUrl']
  }) => Promise<Account>
  deleteAccount: (id: AccountEntity['id']) => Promise<void>
}

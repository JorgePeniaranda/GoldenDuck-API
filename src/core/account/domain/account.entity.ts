import { type URL } from '@/valueObjects/url/url.value'
import { type ValidDate } from '../../../valueObjects/date/validDate.value'
import { type ID } from '../../../valueObjects/id/id.value'
import { type AccountBalance } from './valueObjects/balance/balance.value'

export interface AccountEntity {
  id: ID
  idUser: ID
  balance: AccountBalance
  imgUrl?: URL | null
  updatedAt: ValidDate
  createdAt: ValidDate
  deleted: boolean
}

export interface AccountPrimitiveEntity {
  id: number
  idUser: number
  balance: number | bigint
  imgUrl?: string | null
  updatedAt: Date
  createdAt: Date
  deleted: boolean
}

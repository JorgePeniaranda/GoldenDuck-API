import { type URL } from '@/valueObjects/url/url.value'
import { type ValidDate } from '../../../valueObjects/date/validDate.value'
import { type ID } from '../../../valueObjects/id/id.value'
import { type Balance } from '@/valueObjects/balance/balance.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type PrimitiveBalance } from '@/valueObjects/balance/balance.primitive'
import { type PrimitiveURL } from '@/valueObjects/url/url.primitive'
import { type PrimitiveValidDate } from '@/valueObjects/date/validDate.primitive'

export interface AccountEntity {
  id: ID
  idUser: ID
  balance: Balance
  imgUrl?: URL | null
  updatedAt: ValidDate
  createdAt: ValidDate
  deleted: boolean
}

export interface AccountPrimitiveEntity {
  id: PrimitiveID['id']
  idUser: PrimitiveID['id']
  balance: PrimitiveBalance['balance']
  imgUrl?: PrimitiveURL['url'] | null
  updatedAt: PrimitiveValidDate['validDate']
  createdAt: PrimitiveValidDate['validDate']
  deleted: boolean
}

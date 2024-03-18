import { type URL } from '@/valueObjects/url/url.value'
import { type ID } from '../../../valueObjects/id/id.value'
import { type Balance } from '@/valueObjects/balance/balance.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type PrimitiveBalance } from '@/valueObjects/balance/balance.primitive'
import { type PrimitiveURL } from '@/valueObjects/url/url.primitive'
import { type PastDate } from '@/valueObjects/pastDate/pastDate.value'
import { type PrimitivePastDate } from '@/valueObjects/pastDate/pastDate.primitive'

export interface AccountEntity {
  id: ID
  idUser: ID
  balance: Balance
  imgUrl?: URL | null
  updatedAt: PastDate
  createdAt: PastDate
  deleted: boolean
}

export interface AccountPrimitiveEntity {
  id: PrimitiveID['id']
  idUser: PrimitiveID['id']
  balance: PrimitiveBalance['balance']
  imgUrl?: PrimitiveURL['url'] | null
  updatedAt: PrimitivePastDate['pastDate']
  createdAt: PrimitivePastDate['pastDate']
  deleted: boolean
}

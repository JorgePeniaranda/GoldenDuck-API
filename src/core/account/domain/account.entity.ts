import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type Balance } from './valueObjects/balance/Balance.value'
import { type URL } from '@/valueObjects/string/url/url.value'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type PrimitiveBalance } from './valueObjects/balance/Balance.primitive'
import { type PrimitiveURL } from '@/valueObjects/string/url/url.primitive'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'

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

import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type URL } from '@/valueObjects/string/url/url.value'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type PrimitiveURL } from '@/valueObjects/string/url/url.primitive'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'
import { type PrimitiveValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.primitive'
import {
  type UserEntity,
  type UserPrimitiveEntity
} from '@/core/user/domain/user.entity'
import { type ValidBigInt } from '@/valueObjects/number/BigInt/BigInt.value'
import { type PrimitiveValidBigInt } from '@/valueObjects/number/BigInt/BigInt.primitive'

export interface AccountEntity {
  id: ID
  idUser: UserEntity['id']
  balance: ValidBigInt
  imgUrl?: URL | null
  updatedAt: PastDate
  createdAt: PastDate
  deleted: ValidBoolean
}

export interface AccountPrimitiveEntity {
  id: PrimitiveID['id']
  idUser: UserPrimitiveEntity['id']
  balance: PrimitiveValidBigInt['bigint']
  imgUrl?: PrimitiveURL['url'] | null
  updatedAt: PrimitivePastDate['pastDate']
  createdAt: PrimitivePastDate['pastDate']
  deleted: PrimitiveValidBoolean['boolean']
}

import {
  type AccountEntity,
  type AccountPrimitiveEntity
} from '@/core/account/domain/account.entity'
import {
  type CategoryEntity,
  type CategoryPrimitiveEntity
} from '@/core/category/domain/category.entity'
import { type PrimitiveValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.primitive'
import { type ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'

export interface TransactionEntity {
  id: ID
  from: AccountEntity['id']
  to: AccountEntity['id']
  amount: AccountEntity['balance']
  idCategory?: CategoryEntity['id'] | null
  createdAt: PastDate
  canceled: ValidBoolean
}

export interface TransactionPrimitiveEntity {
  id: PrimitiveID['id']
  from: AccountPrimitiveEntity['id']
  to: AccountPrimitiveEntity['id']
  amount: AccountPrimitiveEntity['balance']
  idCategory?: CategoryPrimitiveEntity['id'] | null
  createdAt: PrimitivePastDate['pastDate']
  canceled: PrimitiveValidBoolean['boolean']
}

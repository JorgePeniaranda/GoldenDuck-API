import { type PrimitiveValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.primitive'
import { type ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type ValidString } from '@/valueObjects/string/string/String.value'
import { type PrimitiveValidString } from '@/valueObjects/string/string/string.primitive'

export interface ErrorEntity {
  id: ID
  name?: ValidString | null
  message?: ValidString | null
  createdAt: PastDate
  deleted: ValidBoolean
}

export interface ErrorPrimitiveEntity {
  id: PrimitiveID['id']
  name?: PrimitiveValidString['string'] | null
  message?: PrimitiveValidString['string'] | null
  createdAt: PrimitivePastDate['pastDate']
  deleted: PrimitiveValidBoolean['boolean']
}

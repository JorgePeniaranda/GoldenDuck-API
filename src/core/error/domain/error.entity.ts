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
  name: ValidString
  message: ValidString
  createdAt: PastDate
  deleted: ValidBoolean
}

export interface ErrorPrimitiveEntity {
  id: PrimitiveID['id']
  name: PrimitiveValidString['string']
  message: PrimitiveValidString['string']
  createdAt: PrimitivePastDate['pastDate']
  deleted: PrimitiveValidBoolean['boolean']
}

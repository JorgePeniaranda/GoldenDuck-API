import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type ValidString } from '@/valueObjects/string/string/String.value'
import { type PrimitiveValidString } from '@/valueObjects/string/string/string.primitive'

export interface SessionEntity {
  id: ID
  idUser: ID
  ip: ValidString
  userAgent: ValidString
  date: PastDate
}

export interface SessionPrimitiveEntity {
  id: PrimitiveID['id']
  idUser: PrimitiveID['id']
  ip: PrimitiveValidString['string']
  userAgent: PrimitiveValidString['string']
  date: PrimitivePastDate['pastDate']
}

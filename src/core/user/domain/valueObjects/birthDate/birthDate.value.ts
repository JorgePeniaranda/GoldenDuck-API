import { PastDateSchema } from '@/valueObjects/date/PastDate/PastDate.schema'
import { type PrimitiveBirthDate } from './BirthDate.primitive'
import { ValueObject } from '@/valueObjects/valueObjects.prototipe'

export class BirthDate extends ValueObject {
  constructor (birthDate: PrimitiveBirthDate['birthDate']) {
    super(birthDate, PastDateSchema('BirthDate'))
  }
}

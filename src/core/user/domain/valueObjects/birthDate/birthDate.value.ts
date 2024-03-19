import { type PrimitiveBirthDate } from './BirthDate.primitive'
import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { BirthDateSchema } from './BirthDate.schema'

export class BirthDate extends ValueObject<PrimitiveBirthDate['birthDate']> {
  constructor (birthDate: PrimitiveBirthDate['birthDate'], name?: string) {
    super(birthDate, BirthDateSchema(name ?? 'BirthDate'))
  }
}

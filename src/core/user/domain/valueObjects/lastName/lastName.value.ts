import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveLastName } from './LastName.primitive'
import { AlphabeticSchema } from '@/valueObjects/string/alphabetic/alphabetic.schema'

export class LastName extends ValueObject<PrimitiveLastName['lastName']> {
  constructor (lastName: PrimitiveLastName['lastName']) {
    super(lastName, AlphabeticSchema('LastName'))
  }
}

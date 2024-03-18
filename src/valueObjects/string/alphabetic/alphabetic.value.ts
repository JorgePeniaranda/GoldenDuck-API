import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveAlphabetic } from './alphabetic.primitive'
import { AlphabeticSchema } from './alphabetic.schema'

export class Alphabetic extends ValueObject {
  constructor (alphabetic: PrimitiveAlphabetic['alphabetic']) {
    super(alphabetic, AlphabeticSchema('Alphabetic'))
  }
}

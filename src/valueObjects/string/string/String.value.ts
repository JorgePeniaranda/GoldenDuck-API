import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveString } from './string.primitive'
import { StringSchema } from './String.schema'

export class Alphabetic extends ValueObject<PrimitiveString['string']> {
  constructor (string: PrimitiveString['string'], name?: string) {
    super(string, StringSchema(name ?? 'String'))
  }
}

import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveValidString } from './string.primitive'
import { ValidStringSchema } from './String.schema'

export class ValidString extends ValueObject<PrimitiveValidString['string']> {
  constructor (string: PrimitiveValidString['string'], name?: string) {
    super(string, ValidStringSchema(name ?? 'String'))
  }
}

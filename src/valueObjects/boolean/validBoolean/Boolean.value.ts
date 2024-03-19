import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveValidBoolean } from './Boolean.primitive'
import { ValidBooleanSchema } from './Boolean.schema'

export class ValidBoolean extends ValueObject<
PrimitiveValidBoolean['boolean']
> {
  constructor (boolean: PrimitiveValidBoolean['boolean'], name?: string) {
    super(boolean, ValidBooleanSchema(name ?? 'Boolean'))
  }
}

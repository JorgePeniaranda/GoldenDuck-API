import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { BooleanSchema } from './Boolean.schema'
import { type PrimitiveBoolean } from './Boolean.primitive'

export class Boolean extends ValueObject<PrimitiveBoolean['boolean']> {
  constructor (boolean: PrimitiveBoolean['boolean'], name?: string) {
    super(boolean, BooleanSchema(name ?? 'Boolean'))
  }
}

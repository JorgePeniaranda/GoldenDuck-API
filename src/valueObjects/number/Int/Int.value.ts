import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { IntSchema } from './Int.schema'
import { type PrimitiveInt } from './Int.primitive'

export class Int extends ValueObject {
  constructor (int: PrimitiveInt['int']) {
    super(int, IntSchema('Int'))
  }
}

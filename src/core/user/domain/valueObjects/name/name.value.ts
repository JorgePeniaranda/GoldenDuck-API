import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { AlphabeticSchema } from '@/valueObjects/string/alphabetic/alphabetic.schema'
import { type PrimitiveName } from './name.primitive'

export class Name extends ValueObject<PrimitiveName['name']> {
  constructor (name: PrimitiveName['name']) {
    super(name, AlphabeticSchema('Name'))
  }
}

import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveSex } from './Sex.primitive'
import { SexSchema } from './Sex.schema'

export class Sex extends ValueObject {
  constructor (sex: PrimitiveSex['sex']) {
    super(sex, SexSchema('Sex'))
  }
}

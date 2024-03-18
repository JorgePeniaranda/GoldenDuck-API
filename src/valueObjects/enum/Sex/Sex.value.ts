import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveSex } from './Sex.primitive'
import { SexSchema } from './Sex.schema'

export class Sex extends ValueObject<PrimitiveSex['sex']> {
  constructor (sex: PrimitiveSex['sex'], name?: string) {
    super(sex, SexSchema(name ?? 'Sex'))
  }
}

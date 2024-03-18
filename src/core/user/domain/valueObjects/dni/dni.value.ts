import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveDNI } from './Dni.primitive'
import { DNISchema } from './Dni.schema'

export class DNI extends ValueObject<PrimitiveDNI['dni']> {
  constructor (dni: PrimitiveDNI['dni']) {
    super(dni, DNISchema('DNI'))
  }
}

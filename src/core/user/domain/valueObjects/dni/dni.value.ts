import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveDNI } from './Dni.primitive'
import { DNISchema } from './Dni.schema'

export class DNI extends ValueObject {
  constructor (dni: PrimitiveDNI['dni']) {
    super(dni, DNISchema('DNI'))
  }
}

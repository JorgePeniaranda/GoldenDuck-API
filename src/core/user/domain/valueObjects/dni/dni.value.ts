import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveDNI } from './Dni.primitive'
import { DNISchema } from './Dni.schema'

export class DNI extends ValueObject<PrimitiveDNI['dni']> {
  constructor (dni: PrimitiveDNI['dni'], name?: string) {
    super(dni, DNISchema(name ?? 'DNI'))
  }
}

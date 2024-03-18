import { type PrimitiveDNI } from './dni.primitive'
import { DNIValidation } from './dni.validation'

export class DNI implements PrimitiveDNI {
  constructor (readonly dni: PrimitiveDNI['dni']) {
    this.validate(this.dni)
  }

  private validate (dni: PrimitiveDNI['dni']): PrimitiveDNI['dni'] {
    return DNIValidation.parse(dni)
  }

  public value (): PrimitiveDNI['dni'] {
    return this.dni
  }
}

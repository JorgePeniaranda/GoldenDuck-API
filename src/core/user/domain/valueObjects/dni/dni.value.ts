import { type UserPrimitiveEntity } from '../../user.entity'
import { DNIValidation } from './dni.validation'

export class UserDNI {
  constructor (private readonly dni: UserPrimitiveEntity['dni']) {
    this.validate(this.dni)
  }

  private validate (dni: UserPrimitiveEntity['dni']): UserPrimitiveEntity['dni'] {
    const validatedDNI = DNIValidation.parse(dni)

    return validatedDNI
  }

  public value (): UserPrimitiveEntity['dni'] {
    return this.dni
  }
}

import { type UserPrimitiveEntity } from '../../user.entity'
import { DNIValidation } from './dni.validation'

export class UserDNI {
  constructor (private readonly dni: UserPrimitiveEntity['dni']) {
    this.validate(this.dni)
  }

  private validate (
    dni: UserPrimitiveEntity['dni']
  ): UserPrimitiveEntity['dni'] {
    return DNIValidation.parse(dni)
  }

  public value (): UserPrimitiveEntity['dni'] {
    return this.dni
  }
}

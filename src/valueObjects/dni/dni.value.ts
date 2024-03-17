import { type UserPrimitiveEntity } from '../../core/user/domain/user.entity'
import { DNIValidation } from './dni.validation'

export class DNI {
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

import { type UserPrimitiveEntity } from '../../core/user/domain/user.entity'
import { BirthDateValidation } from './birthDate.validation'

export class BirthDate {
  constructor (private readonly birthDate: UserPrimitiveEntity['birthDate']) {
    this.validate(this.birthDate)
  }

  private validate (
    birthDate: UserPrimitiveEntity['birthDate']
  ): UserPrimitiveEntity['birthDate'] {
    return BirthDateValidation.parse(birthDate)
  }

  public value (): UserPrimitiveEntity['birthDate'] {
    return this.birthDate
  }
}

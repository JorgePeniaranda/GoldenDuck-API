import { type UserPrimitiveEntity } from '../../user.entity'
import { BirthDateValidation } from './birthDate.validation'

export class UserBirthDate {
  constructor (private readonly birthDate: UserPrimitiveEntity['birthDate']) {
    this.validate(this.birthDate)
  }

  private validate (birthDate: UserPrimitiveEntity['birthDate']): UserPrimitiveEntity['birthDate'] {
    const validatedBirthDate = BirthDateValidation.parse(birthDate)

    return validatedBirthDate
  }

  public value (): UserPrimitiveEntity['birthDate'] {
    return this.birthDate
  }
}

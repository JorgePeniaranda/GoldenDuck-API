import { type UserPrimitiveEntity } from '../../user.entity'
import { SexValidation } from './sex.validation'

export class UserSex {
  constructor (private readonly sex: UserPrimitiveEntity['sex']) {
    this.validate(this.sex)
  }

  private validate (
    sex: UserPrimitiveEntity['sex']
  ): UserPrimitiveEntity['sex'] {
    return SexValidation.parse(sex)
  }

  public value (): UserPrimitiveEntity['sex'] {
    return this.sex
  }
}

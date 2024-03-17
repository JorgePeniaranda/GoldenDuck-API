import { type UserPrimitiveEntity } from '../../core/user/domain/user.entity'
import { SexValidation } from './sex.validation'

export class Sex {
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

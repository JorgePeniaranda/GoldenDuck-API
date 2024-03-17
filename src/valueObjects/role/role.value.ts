import { type UserPrimitiveEntity } from '../../core/user/domain/user.entity'
import { RoleValidation } from './role.validation'

export class Role {
  constructor (private readonly role: UserPrimitiveEntity['role']) {
    this.validate(this.role)
  }

  private validate (
    role: UserPrimitiveEntity['role']
  ): UserPrimitiveEntity['role'] {
    return RoleValidation.parse(role)
  }

  public value (): UserPrimitiveEntity['role'] {
    return this.role
  }
}

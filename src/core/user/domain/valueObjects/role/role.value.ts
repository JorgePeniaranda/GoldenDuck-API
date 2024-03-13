import { type UserPrimitiveEntity } from '../../user.entity'
import { RoleValidation } from './role.validation'

export class UserRole {
  constructor (private readonly role: UserPrimitiveEntity['role']) {
    this.validate(this.role)
  }

  private validate (role: UserPrimitiveEntity['role']): UserPrimitiveEntity['role'] {
    const validatedRole = RoleValidation.parse(role)

    return validatedRole
  }

  public value (): UserPrimitiveEntity['role'] {
    return this.role
  }
}

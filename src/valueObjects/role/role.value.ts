import { type PrimitiveRole } from './role.primitive'
import { RoleValidation } from './role.validation'

export class Role implements PrimitiveRole {
  constructor (readonly role: PrimitiveRole['role']) {
    this.validate(this.role)
  }

  private validate (role: PrimitiveRole['role']): PrimitiveRole['role'] {
    return RoleValidation.parse(role)
  }

  public value (): PrimitiveRole['role'] {
    return this.role
  }
}

import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveRole } from './Role.primitive'
import { RoleSchema } from './Role.schema'

export class Role extends ValueObject {
  constructor (role: PrimitiveRole['role']) {
    super(role, RoleSchema('Role'))
  }
}

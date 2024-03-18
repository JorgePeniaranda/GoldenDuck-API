import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveRole } from './Role.primitive'
import { RoleSchema } from './Role.schema'

export class Role extends ValueObject<PrimitiveRole['role']> {
  constructor (role: PrimitiveRole['role'], name?: string) {
    super(role, RoleSchema(name ?? 'Role'))
  }
}

import { PartialType, PickType } from '@nestjs/swagger'
import { UserValidations } from '../user.validation'

export class UpdateUserDTO extends PartialType(PickType(UserValidations, ['name', 'lastName', 'email', 'phoneNumber', 'password', 'address', 'role'])) { }

import { PickType } from '@nestjs/swagger'
import { UserValidations } from '../user.validation'

export class CreateUserDTO extends PickType(UserValidations, ['name', 'lastName', 'dni', 'email', 'phoneNumber', 'password', 'salt', 'address', 'birthDate', 'sex', 'role']) { }

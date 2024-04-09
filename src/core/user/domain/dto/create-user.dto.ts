import { PickType } from '@nestjs/swagger'
import { UserDTO } from '../user.dto'

export class CreateUserDTO extends PickType(UserDTO, [
  'name',
  'lastName',
  'dni',
  'email',
  'phoneNumber',
  'password',
  'address',
  'birthDate',
  'sex',
  'role'
]) {}

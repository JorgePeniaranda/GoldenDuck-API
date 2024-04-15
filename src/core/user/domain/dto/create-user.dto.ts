import { InputType, PickType } from '@nestjs/graphql'
import { UserDTO } from '../user.dto'

@InputType()
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
] as const) {}

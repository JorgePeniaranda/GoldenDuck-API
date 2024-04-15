import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'
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
]) {}

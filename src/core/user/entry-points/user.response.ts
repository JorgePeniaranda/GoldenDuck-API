import { PickType } from '@nestjs/swagger'
import { UserDTO } from '../domain/user.dto'

export class UserResponse extends PickType(UserDTO, [
  'id',
  'name',
  'lastName',
  'dni',
  'email',
  'phoneNumber',
  'address',
  'birthDate',
  'sex',
  'imgUrl',
  'updatedAt',
  'createdAt',
  'actived',
  'deleted',
  'role'
]) {}

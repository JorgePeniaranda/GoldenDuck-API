import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { UserDTO } from '../user.dto'

@InputType()
export class UpdateUserDTO extends PartialType(
  PickType(UserDTO, [
    'name',
    'lastName',
    'email',
    'phoneNumber',
    'password',
    'address',
    'imgUrl',
    'role'
  ] as const)
) {}

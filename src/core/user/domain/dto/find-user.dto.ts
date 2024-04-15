import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { UserDTO } from '../user.dto'

@InputType()
export class FindUserDTO extends PartialType(
  PickType(UserDTO, ['dni', 'email', 'phoneNumber'] as const)
) {}

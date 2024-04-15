import { InputType } from '@nestjs/graphql'
import { PartialType, PickType } from '@nestjs/swagger'
import { UserDTO } from '../user.dto'

@InputType()
export class FindUserDTO extends PartialType(PickType(UserDTO, ['dni', 'email', 'phoneNumber'])) {}

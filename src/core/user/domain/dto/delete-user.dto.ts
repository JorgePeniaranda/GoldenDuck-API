import { InputType, PickType } from '@nestjs/graphql'
import { UserDTO } from '../user.dto'

@InputType()
export class DeleteUserDTO extends PickType(UserDTO, ['password'] as const) {}

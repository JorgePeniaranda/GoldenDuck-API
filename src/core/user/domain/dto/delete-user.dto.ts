import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'
import { UserDTO } from '../user.dto'

@InputType()
export class DeleteUserDTO extends PickType(UserDTO, ['password']) {}

import { UserDTO } from '@/core/user/domain/user.dto'
import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'

@InputType()
export class LoginDTO extends PickType(UserDTO, ['email', 'password']) {}

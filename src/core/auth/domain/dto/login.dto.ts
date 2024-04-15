import { UserDTO } from '@/core/user/domain/user.dto'
import { InputType, PickType } from '@nestjs/graphql'

@InputType()
export class LoginDTO extends PickType(UserDTO, ['email', 'password']) {}

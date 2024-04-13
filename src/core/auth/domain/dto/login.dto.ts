import { UserDTO } from '@/core/user/domain/user.dto'
import { PickType } from '@nestjs/swagger'

export class LoginDTO extends PickType(UserDTO, ['email', 'password']) {}

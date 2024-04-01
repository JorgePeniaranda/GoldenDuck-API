import { PickType } from '@nestjs/swagger'
import { UserDTO } from '../user.dto'

export class DeleteUserDTO extends PickType(UserDTO, ['password']) { }

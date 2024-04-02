import { PickType } from '@nestjs/swagger'
import { UserDTO } from '../user.dto'

export class IDUserDTO extends PickType(UserDTO, ['id']) {}

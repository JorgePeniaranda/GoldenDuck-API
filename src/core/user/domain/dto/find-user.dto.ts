import { PartialType, PickType } from '@nestjs/swagger'
import { UserDTO } from '../user.dto'

export class FindUserDTO extends PartialType(PickType(UserDTO, ['dni', 'email', 'phoneNumber'])) {}

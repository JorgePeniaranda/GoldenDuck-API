import { PartialType, PickType } from '@nestjs/swagger'
import { UserValidations } from '../user.validation'

export class FindUserDTO extends PartialType(PickType(UserValidations, ['dni', 'email', 'phoneNumber'])) { }

import { PickType } from '@nestjs/swagger'
import { UserValidations } from '../user.validation'

export class IDUserDTO extends PickType(UserValidations, ['id']) { }

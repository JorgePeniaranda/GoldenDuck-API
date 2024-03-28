import { PickType } from '@nestjs/swagger'
import { UserValidations } from '../user.validation'

export class DeleteUserDTO extends PickType(UserValidations, ['password']) { }

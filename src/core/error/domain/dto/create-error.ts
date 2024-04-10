import { PickType } from '@nestjs/swagger'
import { ErrorDTO } from '../error.dto'

export class CreateErrorDTO extends PickType(ErrorDTO, ['name', 'message', 'stack']) {}

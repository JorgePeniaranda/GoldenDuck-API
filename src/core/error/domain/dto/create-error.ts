import { InputType, PickType } from '@nestjs/graphql'
import { ErrorDTO } from '../error.dto'

@InputType()
export class CreateErrorDTO extends PickType(ErrorDTO, ['name', 'message', 'stack'] as const) {}

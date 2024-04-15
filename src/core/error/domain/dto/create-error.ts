import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'
import { ErrorDTO } from '../error.dto'

@InputType()
export class CreateErrorDTO extends PickType(ErrorDTO, ['name', 'message', 'stack']) {}

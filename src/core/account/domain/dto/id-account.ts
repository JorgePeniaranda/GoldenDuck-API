import { PickType } from '@nestjs/swagger'
import { AccountDTO } from '../account.dto'

export class IDAccountDTO extends PickType(AccountDTO, ['id']) { }

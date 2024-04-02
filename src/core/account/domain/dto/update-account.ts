import { PickType } from '@nestjs/swagger'
import { AccountDTO } from '../account.dto'

export class UpdateAccountDTO extends PickType(AccountDTO, ['imgUrl']) { }

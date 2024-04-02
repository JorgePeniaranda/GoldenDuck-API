import { PickType } from '@nestjs/swagger'
import { AccountDTO } from '../account.dto'

export class CreateAccountDTO extends PickType(AccountDTO, ['idUser']) {}

import { PickType } from '@nestjs/swagger'
import { LoanDTO } from '../loan.dto'

export class CreateLoanDTO extends PickType(LoanDTO, ['idAccount', 'amount', 'interest', 'dateEnd']) {}

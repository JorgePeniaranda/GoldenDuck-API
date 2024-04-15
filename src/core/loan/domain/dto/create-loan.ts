import { InputType, PickType } from '@nestjs/graphql'
import { LoanDTO } from '../loan.dto'

@InputType()
export class CreateLoanDTO extends PickType(LoanDTO, [
  'idAccount',
  'amount',
  'interest',
  'dateEnd'
] as const) {}

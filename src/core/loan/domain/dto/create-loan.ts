import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'
import { LoanDTO } from '../loan.dto'

@InputType()
export class CreateLoanDTO extends PickType(LoanDTO, [
  'idAccount',
  'amount',
  'interest',
  'dateEnd'
]) {}

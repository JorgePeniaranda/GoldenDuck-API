import { InputType, PickType } from '@nestjs/graphql'
import { InvestmentDTO } from '../investment.dto'

@InputType()
export class CreateInvestmentDTO extends PickType(InvestmentDTO, [
  'idAccount',
  'amount',
  'interest',
  'dateEnd'
] as const) {}

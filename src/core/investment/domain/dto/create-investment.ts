import { InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/swagger'
import { InvestmentDTO } from '../investment.dto'

@InputType()
export class CreateInvestmentDTO extends PickType(InvestmentDTO, [
  'idAccount',
  'amount',
  'interest',
  'dateEnd'
]) {}

import { PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { InvestmentDTO } from '../investment.dto'

const keys = [
  'idAccount',
  'amount',
  'interest',
  'dateEnd'
] as const

export class CreateInvestmentDTO extends PickType(InvestmentDTO, keys) {}

@InputType()
export class GQLCreateInvestmentDTO extends GQLPickType(InvestmentDTO, keys) {}

export class SWGCreateInvestmentDTO extends SWGPickType(InvestmentDTO, keys) {}

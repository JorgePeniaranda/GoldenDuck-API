import { PickType as GQLPickType, InputType } from '@nestjs/graphql'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { LoanDTO } from '../loan.dto'

const keys = [
  'idAccount',
  'amount',
  'interest',
  'dateEnd'
] as const

export class CreateLoanDTO extends PickType(LoanDTO, keys) {}

@InputType()
export class GQLCreateLoanDTO extends GQLPickType(LoanDTO, keys) {}

export class SWGCreateLoanDTO extends SWGPickType(LoanDTO, keys) {}

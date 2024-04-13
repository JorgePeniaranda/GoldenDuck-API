import { PickType } from '@nestjs/swagger'
import { InvestmentDTO } from '../domain/investment.dto'

export class InvestmentResponse extends PickType(InvestmentDTO, [
  'id',
  'idAccount',
  'amount',
  'interest',
  'dateEnd',
  'updatedAt',
  'createdAt',
  'canceled'
]) {}

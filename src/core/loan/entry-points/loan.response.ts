import { PickType } from '@nestjs/swagger'
import { LoanDTO } from '../domain/loan.dto'

export class LoanResponse extends PickType(LoanDTO, [
  'id',
  'idAccount',
  'amount',
  'interest',
  'dateEnd',
  'updatedAt',
  'createdAt',
  'canceled'
]) {
}

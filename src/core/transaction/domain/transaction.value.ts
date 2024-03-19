import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import {
  type TransactionPrimitiveEntity,
  type TransactionEntity
} from './transaction.entity'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { ValidBigInt } from '@/valueObjects/number/BigInt/BigInt.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'

const ObjectName = 'Transaction'

export class Transaction implements TransactionEntity {
  readonly id: TransactionEntity['id']
  readonly from: TransactionEntity['from']
  readonly to: TransactionEntity['to']
  readonly amount: TransactionEntity['amount']
  readonly idCategory: TransactionEntity['idCategory']
  readonly createdAt: TransactionEntity['createdAt']
  readonly canceled: TransactionEntity['canceled']

  constructor (transaction: TransactionPrimitiveEntity) {
    this.id = new ID(transaction.id, `${ObjectName} -> ID`)
    this.from = new ID(transaction.from, `${ObjectName} -> From`)
    this.to = new ID(transaction.to, `${ObjectName} -> To`)
    this.amount = new ValidBigInt(transaction.amount, `${ObjectName} -> Amount`)
    this.idCategory = transaction.idCategory === null || transaction.idCategory === undefined
      ? null
      : new ID(
        transaction.idCategory,
      `${ObjectName} -> IDCategory`
      )
    this.createdAt = new PastDate(
      transaction.createdAt,
      `${ObjectName} -> Date`
    )
    this.canceled = new ValidBoolean(transaction.canceled, `${ObjectName} -> Canceled`)
  }

  public toJSON (): TransactionPrimitiveEntity {
    return {
      id: this.id.value,
      from: this.from.value,
      to: this.to.value,
      amount: this.amount.value,
      idCategory: this.idCategory?.value,
      createdAt: this.createdAt.value,
      canceled: this.canceled.value
    }
  }
}

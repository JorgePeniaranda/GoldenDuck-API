import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import {
  type TransactionPrimitiveEntity,
  type TransactionEntity
} from './transaction.entity'
import { ID } from '@/valueObjects/number/ID/ID.value'
import { ValidBigInt } from '@/valueObjects/number/BigInt/BigInt.value'

const ObjectName = 'Transaction'

export class Transaction implements TransactionEntity {
  readonly id: TransactionEntity['id']
  readonly from: TransactionEntity['from']
  readonly to: TransactionEntity['to']
  readonly amount: TransactionEntity['amount']
  readonly idCategory: TransactionEntity['idCategory']
  readonly createdAt: TransactionEntity['createdAt']

  constructor (transaction: TransactionEntity) {
    this.id = transaction.id
    this.from = transaction.from
    this.to = transaction.to
    this.amount = transaction.amount
    this.idCategory = transaction.idCategory
    this.createdAt = transaction.createdAt
  }

  public create (transaction: TransactionPrimitiveEntity): Transaction {
    return new Transaction({
      id: new ID(transaction.id, `${ObjectName} -> ID`),
      from: new ID(transaction.from, `${ObjectName} -> From`),
      to: new ID(transaction.to, `${ObjectName} -> To`),
      amount: new ValidBigInt(transaction.amount, `${ObjectName} -> Amount`),
      idCategory: new ID(transaction.idCategory, `${ObjectName} -> IDCategory`),
      createdAt: new PastDate(transaction.createdAt, `${ObjectName} -> Date`)
    })
  }

  public toJSON (): TransactionPrimitiveEntity {
    return {
      id: this.id.value,
      from: this.from.value,
      to: this.to.value,
      amount: this.amount.value,
      idCategory: this.idCategory.value,
      createdAt: this.createdAt.value
    }
  }
}

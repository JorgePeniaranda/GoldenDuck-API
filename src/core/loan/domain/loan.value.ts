import { ID } from '@/valueObjects/number/ID/ID.value'
import { type LoanPrimitiveEntity, type LoanEntity } from './loan.entity'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ValidDate } from '@/valueObjects/date/ValidDate/ValidDate.value'
import { Float } from '@/valueObjects/number/Float/Float.value'
import { ValidBigInt } from '@/valueObjects/number/BigInt/BigInt.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'

const ObjectName = 'Loan'

export class Loan implements LoanEntity {
  readonly id: LoanEntity['id']
  readonly idAccount: LoanEntity['idAccount']
  readonly amount: LoanEntity['amount']
  readonly interest: LoanEntity['interest']
  readonly createdAt: LoanEntity['createdAt']
  readonly dateEnd: LoanEntity['dateEnd']
  readonly canceled: LoanEntity['canceled']

  constructor (loan: LoanPrimitiveEntity) {
    this.id = new ID(loan.id, `${ObjectName} -> ID`)
    this.idAccount = new ID(loan.idAccount, `${ObjectName} -> IDAccount`)
    this.amount = new ValidBigInt(loan.amount, `${ObjectName} -> Amount`)
    this.interest = new Float(loan.interest, `${ObjectName} -> Interest`)
    this.createdAt = new PastDate(loan.createdAt, `${ObjectName} -> Date`)
    this.dateEnd = new ValidDate(loan.dateEnd, `${ObjectName} -> DateEnd`)
    this.canceled = new ValidBoolean(loan.canceled, `${ObjectName} -> Canceled`)
  }

  public toJSON (): LoanPrimitiveEntity {
    return {
      id: this.id.value,
      idAccount: this.idAccount.value,
      amount: this.amount.value,
      interest: this.interest.value,
      createdAt: this.createdAt.value,
      dateEnd: this.dateEnd.value,
      canceled: this.canceled.value
    }
  }
}

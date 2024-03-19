import { ID } from '@/valueObjects/number/ID/ID.value'
import { type LoanPrimitiveEntity, type LoanEntity } from './loan.entity'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ValidDate } from '@/valueObjects/date/ValidDate/ValidDate.value'
import { Float } from '@/valueObjects/number/Float/Float.value'
import { ValidBigInt } from '@/valueObjects/number/BigInt/BigInt.value'

const ObjectName = 'Loan'

export class Loan implements LoanEntity {
  readonly id: LoanEntity['id']
  readonly idAccount: LoanEntity['idAccount']
  readonly amount: LoanEntity['amount']
  readonly interest: LoanEntity['interest']
  readonly createdAt: LoanEntity['createdAt']
  readonly dateEnd: LoanEntity['dateEnd']

  constructor (loan: LoanEntity) {
    this.id = loan.id
    this.idAccount = loan.idAccount
    this.amount = loan.amount
    this.interest = loan.interest
    this.createdAt = loan.createdAt
    this.dateEnd = loan.dateEnd
  }

  public create (loan: LoanPrimitiveEntity): Loan {
    return new Loan({
      id: new ID(loan.id, `${ObjectName} -> ID`),
      idAccount: new ID(loan.idAccount, `${ObjectName} -> IDAccount`),
      amount: new ValidBigInt(loan.amount, `${ObjectName} -> Amount`),
      interest: new Float(loan.interest, `${ObjectName} -> Interest`),
      createdAt: new PastDate(loan.createdAt, `${ObjectName} -> Date`),
      dateEnd: new ValidDate(loan.dateEnd, `${ObjectName} -> DateEnd`)
    })
  }

  public toJSON (): LoanPrimitiveEntity {
    return {
      id: this.id.value,
      idAccount: this.idAccount.value,
      amount: this.amount.value,
      interest: this.interest.value,
      createdAt: this.createdAt.value,
      dateEnd: this.dateEnd.value
    }
  }
}

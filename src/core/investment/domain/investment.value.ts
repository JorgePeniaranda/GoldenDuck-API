import { ID } from '@/valueObjects/number/ID/ID.value'
import {
  type InvestmentPrimitiveEntity,
  type InvestmentEntity
} from './investment.entity'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ValidDate } from '@/valueObjects/date/ValidDate/ValidDate.value'
import { Float } from '@/valueObjects/number/Float/Float.value'
import { ValidBigInt } from '@/valueObjects/number/BigInt/BigInt.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'

const ObjectName = 'Investment'

export class Investment implements InvestmentEntity {
  readonly id: InvestmentEntity['id']
  readonly idAccount: InvestmentEntity['idAccount']
  readonly amount: InvestmentEntity['amount']
  readonly interest: InvestmentEntity['interest']
  readonly createdAt: InvestmentEntity['createdAt']
  readonly dateEnd: InvestmentEntity['dateEnd']
  readonly canceled: InvestmentEntity['canceled']

  constructor (investment: InvestmentPrimitiveEntity) {
    this.id = new ID(investment.id, `${ObjectName} -> ID`)
    this.idAccount = new ID(investment.idAccount, `${ObjectName} -> IDAccount`)
    this.amount = new ValidBigInt(investment.amount, `${ObjectName} -> Date`)
    this.interest = new Float(investment.interest, `${ObjectName} -> Interest`)
    this.createdAt = new PastDate(
      investment.createdAt,
      `${ObjectName} -> CreatedAt`
    )
    this.dateEnd = new ValidDate(investment.dateEnd, `${ObjectName} -> DateEnd`)
    this.canceled = new ValidBoolean(
      investment.canceled,
      `${ObjectName} -> Canceled`
    )
  }

  public toJSON (): InvestmentPrimitiveEntity {
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

import { ID } from '@/valueObjects/number/ID/ID.value'
import {
  type InvestmentPrimitiveEntity,
  type InvestmentEntity
} from './investment.entity'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ValidDate } from '@/valueObjects/date/ValidDate/ValidDate.value'
import { Float } from '@/valueObjects/number/Float/Float.value'
import { ValidBigInt } from '@/valueObjects/number/BigInt/BigInt.value'

const ObjectName = 'Investment'

export class Investment implements InvestmentEntity {
  readonly id: InvestmentEntity['id']
  readonly idAccount: InvestmentEntity['idAccount']
  readonly amount: InvestmentEntity['amount']
  readonly interest: InvestmentEntity['interest']
  readonly createdAt: InvestmentEntity['createdAt']
  readonly dateEnd: InvestmentEntity['dateEnd']

  constructor (investment: InvestmentEntity) {
    this.id = investment.id
    this.idAccount = investment.idAccount
    this.amount = investment.amount
    this.interest = investment.interest
    this.createdAt = investment.createdAt
    this.dateEnd = investment.dateEnd
  }

  public create (investment: InvestmentPrimitiveEntity): Investment {
    return new Investment({
      id: new ID(investment.id, `${ObjectName} -> ID`),
      idAccount: new ID(investment.idAccount, `${ObjectName} -> IDAccount`),
      amount: new ValidBigInt(investment.amount, `${ObjectName} -> Date`),
      interest: new Float(investment.interest, `${ObjectName} -> Interest`),
      createdAt: new PastDate(investment.createdAt, `${ObjectName} -> Date`),
      dateEnd: new ValidDate(investment.dateEnd, `${ObjectName} -> DateEnd`)
    })
  }

  public toJSON (): InvestmentPrimitiveEntity {
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

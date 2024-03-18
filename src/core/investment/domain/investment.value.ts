import { ID } from '@/valueObjects/number/ID/ID.value'
import {
  type InvestmentPrimitiveEntity,
  type InvestmentEntity
} from './investment.entity'
import { Balance } from '@/core/account/domain/valueObjects/balance/Balance.value'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ValidDate } from '@/valueObjects/date/ValidDate/ValidDate.value'

export class Investment implements InvestmentEntity {
  readonly id: InvestmentEntity['id']
  readonly idAccount: InvestmentEntity['idAccount']
  readonly amount: InvestmentEntity['amount']
  readonly interest: InvestmentEntity['interest']
  readonly date: InvestmentEntity['date']
  readonly dateEnd: InvestmentEntity['dateEnd']

  constructor (investment: InvestmentEntity) {
    this.id = investment.id
    this.idAccount = investment.idAccount
    this.amount = investment.amount
    this.interest = investment.interest
    this.date = investment.date
    this.dateEnd = investment.dateEnd
  }

  public create (investment: InvestmentPrimitiveEntity): Investment {
    return new Investment({
      id: new ID(investment.id),
      idAccount: new ID(investment.idAccount),
      amount: new Balance(investment.amount),
      interest: investment.interest,
      date: new PastDate(investment.date),
      dateEnd: new ValidDate(investment.dateEnd)
    })
  }

  public toJSON (): InvestmentPrimitiveEntity {
    return {
      id: this.id.value,
      idAccount: this.idAccount.value,
      amount: this.amount.value,
      interest: this.interest,
      date: this.date.value,
      dateEnd: this.dateEnd.value
    }
  }
}

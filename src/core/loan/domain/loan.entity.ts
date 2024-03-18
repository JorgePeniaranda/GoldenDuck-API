import { type PrimitiveBalance } from '@/core/account/domain/valueObjects/balance/Balance.primitive'
import { type Balance } from '@/core/account/domain/valueObjects/balance/Balance.value'
import { type UserEntity, type UserPrimitiveEntity } from '@/core/user/domain/user.entity'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type ValidDate } from '@/valueObjects/date/ValidDate/ValidDate.value'
import { type PrimitiveFloat } from '@/valueObjects/number/Float/Float.primitive'
import { type Float } from '@/valueObjects/number/Float/Float.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'

export interface LoanEntity {
  id: ID
  idAccount: UserEntity['id']
  amount: Balance
  interest: Float
  date: PastDate
  dateEnd: ValidDate
}
export interface LoanPrimitiveEntity {
  id: PrimitiveID['id']
  idAccount: UserPrimitiveEntity['id']
  amount: PrimitiveBalance['balance']
  interest: PrimitiveFloat['float']
  date: PrimitivePastDate['pastDate']
  dateEnd: PrimitivePastDate['pastDate']
}

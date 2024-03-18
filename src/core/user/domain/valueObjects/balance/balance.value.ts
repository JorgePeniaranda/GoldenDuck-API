import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveBalance } from './Balance.primitive'
import { FloatSchema } from '@/valueObjects/number/Float/Float.schema'

export class Balance extends ValueObject<PrimitiveBalance['balance']> {
  constructor (balance: PrimitiveBalance['balance']) {
    super(balance, FloatSchema('Balance'))
  }
}

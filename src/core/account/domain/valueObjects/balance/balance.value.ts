import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { PositiveFloatSchema } from '@/valueObjects/number/PositiveFloat/PositiveFloat.schema'
import { type PrimitiveBalance } from './Balance.primitive'

export class Balance extends ValueObject {
  constructor (readonly balance: PrimitiveBalance['balance']) {
    super(balance, PositiveFloatSchema('Balance'))
  }
}

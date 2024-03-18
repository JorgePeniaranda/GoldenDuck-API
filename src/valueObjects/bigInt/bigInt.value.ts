import { type PrimitiveValidBigInt } from './bigInt.primitive'
import { ValidatedValidBigInt } from './bigInt.validation'

export class ValidBigInt implements PrimitiveValidBigInt {
  constructor (readonly bigint: PrimitiveValidBigInt['bigint']) {
    this.validate(this.bigint)
  }

  private validate (bigint: PrimitiveValidBigInt['bigint']): PrimitiveValidBigInt['bigint'] {
    return ValidatedValidBigInt.parse(bigint)
  }

  public value (): PrimitiveValidBigInt['bigint'] {
    return this.bigint
  }
}

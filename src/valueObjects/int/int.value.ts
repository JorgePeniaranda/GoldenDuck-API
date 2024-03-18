import { type PrimitiveInt } from './int.primitive'
import { ValidatedINT } from './int.validation'

export class Int implements PrimitiveInt {
  constructor (readonly int: PrimitiveInt['int']) {
    this.validate(this.int)
  }

  private validate (int: PrimitiveInt['int']): PrimitiveInt['int'] {
    const validatedINT = ValidatedINT.parse(int)

    return validatedINT
  }

  public value (): PrimitiveInt['int'] {
    return this.int
  }
}

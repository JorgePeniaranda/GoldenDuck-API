import { type PrimitiveSex } from './sex.primitive'
import { SexValidation } from './sex.validation'

export class Sex implements PrimitiveSex {
  constructor (readonly sex: PrimitiveSex['sex']) {
    this.validate(this.sex)
  }

  private validate (
    sex: PrimitiveSex['sex']
  ): PrimitiveSex['sex'] {
    return SexValidation.parse(sex)
  }

  public value (): PrimitiveSex['sex'] {
    return this.sex
  }
}

import { type PrimitiveBirthDate } from './birthDate.primitive'
import { BirthDateValidation } from './birthDate.validation'

export class BirthDate implements PrimitiveBirthDate {
  constructor (readonly birthDate: PrimitiveBirthDate['birthDate']) {
    this.validate(this.birthDate)
  }

  private validate (
    birthDate: PrimitiveBirthDate['birthDate']
  ): PrimitiveBirthDate['birthDate'] {
    return BirthDateValidation.parse(birthDate)
  }

  public value (): PrimitiveBirthDate['birthDate'] {
    return this.birthDate
  }
}

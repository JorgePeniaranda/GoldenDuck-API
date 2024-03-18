import { type PrimitiveValidDate } from './validDate.primitive'
import { ValidDateValidation } from './validDate.validation'

export class ValidDate implements PrimitiveValidDate {
  constructor (readonly validDate: PrimitiveValidDate['validDate']) {
    this.validate(this.validDate)
  }

  private validate (validDate: PrimitiveValidDate['validDate']): PrimitiveValidDate['validDate'] {
    const validatedBirthDate = ValidDateValidation.parse(validDate)

    return validatedBirthDate
  }

  public value (): PrimitiveValidDate['validDate'] {
    return this.validDate
  }
}

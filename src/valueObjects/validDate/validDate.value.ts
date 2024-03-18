import { type PrimitiveValidDate } from './validDate.primitive'
import { ValidatedValidDate } from './validDate.validation'

export class ValidDate implements PrimitiveValidDate {
  constructor (readonly validDate: PrimitiveValidDate['validDate']) {
    this.validate(this.validDate)
  }

  private validate (validDate: PrimitiveValidDate['validDate']): PrimitiveValidDate['validDate'] {
    const validatedValidDate = ValidatedValidDate.parse(validDate)

    return validatedValidDate
  }

  public value (): PrimitiveValidDate['validDate'] {
    return this.validDate
  }
}

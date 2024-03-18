import { type PrimitiveLastName } from './lastName.primitive'
import { LastNameValidation } from './lastName.validation'

export class LastName implements PrimitiveLastName {
  constructor (readonly lastName: PrimitiveLastName['lastName']) {
    this.validate(this.lastName)
  }

  private validate (
    lastName: PrimitiveLastName['lastName']
  ): PrimitiveLastName['lastName'] {
    return LastNameValidation.parse(lastName)
  }

  public value (): PrimitiveLastName['lastName'] {
    return this.lastName
  }
}

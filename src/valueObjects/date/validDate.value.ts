import { ValidDateValidation } from './validDate.validation'

export class ValidDate {
  constructor (private readonly birthDate: Date) {
    this.validate(this.birthDate)
  }

  private validate (birthDate: Date): Date {
    const validatedBirthDate = ValidDateValidation.parse(birthDate)

    return validatedBirthDate
  }

  public value (): Date {
    return this.birthDate
  }
}

import { ValidatedID } from './id.validation'

export class ID {
  constructor (private readonly id: number) {
    this.validate(this.id)
  }

  private validate (birthDate: number): number {
    const validatedID = ValidatedID.parse(birthDate)

    return validatedID
  }

  public value (): number {
    return this.id
  }
}

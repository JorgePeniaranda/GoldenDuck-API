import { ValidatedID } from './id.validation'

export class ID {
  constructor (private readonly id: number) {
    this.validate(this.id)
  }

  private validate (id: number): number {
    const validatedID = ValidatedID.parse(id)

    return validatedID
  }

  public value (): number {
    return this.id
  }
}

import { type PrimitiveID } from './id.primitive'
import { ValidatedID } from './id.validation'

export class ID implements PrimitiveID {
  constructor (readonly id: PrimitiveID['id']) {
    this.validate(this.id)
  }

  private validate (id: PrimitiveID['id']): PrimitiveID['id'] {
    const validatedID = ValidatedID.parse(id)

    return validatedID
  }

  public value (): PrimitiveID['id'] {
    return this.id
  }
}

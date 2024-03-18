import { type PrimitiveID } from './id.primitive'
import { ValidatedID } from './id.validation'

export class ID implements PrimitiveID {
  constructor (readonly id: PrimitiveID['id']) {
    this.validate(this.id)
  }

  private validate (id: PrimitiveID['id']): PrimitiveID['id'] {
    return ValidatedID.parse(id)
  }

  public value (): PrimitiveID['id'] {
    return this.id
  }
}

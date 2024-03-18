import { type PrimitiveName } from './name.primitive'
import { NameValidation } from './name.validation'

export class Name implements PrimitiveName {
  constructor (readonly name: PrimitiveName['name']) {
    this.validate(this.name)
  }

  private validate (name: PrimitiveName['name']): PrimitiveName['name'] {
    return NameValidation.parse(name)
  }

  public value (): PrimitiveName['name'] {
    return this.name
  }
}

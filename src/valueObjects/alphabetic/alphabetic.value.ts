import { type PrimitiveAlphabetic } from './alphabetic.primitive'
import { ValidatedAlphabetic } from './alphabetic.validation'

export class Alphabetic implements PrimitiveAlphabetic {
  constructor (readonly alphabetic: PrimitiveAlphabetic['alphabetic']) {
    this.validate(this.alphabetic)
  }

  private validate (alphabetic: PrimitiveAlphabetic['alphabetic']): PrimitiveAlphabetic['alphabetic'] {
    const validatedAlphabetic = ValidatedAlphabetic.parse(alphabetic)

    return validatedAlphabetic
  }

  public value (): PrimitiveAlphabetic['alphabetic'] {
    return this.alphabetic
  }
}

import { type PrimitiveFloat } from './float.primitive'
import { ValidatedURL } from './float.validation'

export class Float implements PrimitiveFloat {
  constructor (readonly float: PrimitiveFloat['float']) {
    this.validate(this.float)
  }

  private validate (float: PrimitiveFloat['float']): PrimitiveFloat['float'] {
    const validatedURL = ValidatedURL.parse(float)

    return validatedURL
  }

  public value (): PrimitiveFloat['float'] {
    return this.float
  }
}

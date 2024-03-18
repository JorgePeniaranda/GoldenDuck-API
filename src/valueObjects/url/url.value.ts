import { type PrimitiveURL } from './url.primitive'
import { ValidatedURL } from './url.validation'

export class URL implements PrimitiveURL {
  constructor (readonly url: PrimitiveURL['url']) {
    this.validate(this.url)
  }

  private validate (url: PrimitiveURL['url']): PrimitiveURL['url'] {
    const validatedURL = ValidatedURL.parse(url)

    return validatedURL
  }

  public value (): PrimitiveURL['url'] {
    return this.url
  }
}

import { ValidatedURL } from './url.validation'

export class URL {
  constructor (private readonly url: string) {
    this.validate(this.url)
  }

  private validate (url: string): string {
    const validatedURL = ValidatedURL.parse(url)

    return validatedURL
  }

  public value (): string {
    return this.url
  }
}

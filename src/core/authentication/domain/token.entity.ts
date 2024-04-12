export class Token {
  readonly #token: string

  constructor (token: string) {
    this.#token = token
  }

  get token (): string {
    return this.#token
  }

  toJSON (): { token: string } {
    return {
      token: this.#token
    }
  }
}

import { type TokenPrimitive } from './primitive/token.primitive'

export class Token implements TokenPrimitive {
  readonly #token: TokenPrimitive['token']

  constructor (token: TokenPrimitive['token']) {
    this.#token = token
  }

  get token (): TokenPrimitive['token'] {
    return this.#token
  }

  toJSON (): TokenPrimitive {
    return {
      token: this.token
    }
  }
}

import { type TokenPrimitive } from './primitive/token.primitive'

export class Token implements TokenPrimitive {
  readonly #token: TokenPrimitive['token']

  constructor (token: TokenPrimitive['token']) {
    this.#token = token
  }

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  public get token (): TokenPrimitive['token'] {
    return this.#token
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  public toJSON (): TokenPrimitive {
    return {
      token: this.token
    }
  }
}

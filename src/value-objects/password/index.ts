import bcrypt from 'bcryptjs'

export class Password {
  #value: string
  #salt: string

  constructor (value: string, salt: string) {
    this.#value = value
    this.#salt = salt
  }

  get value (): string {
    return this.#value
  }

  set value (value: string) {
    this.#salt = bcrypt.genSaltSync(10)
    this.#value = bcrypt.hashSync(value, this.#salt)
  }

  get salt (): string {
    return this.#salt
  }

  public static create (value: string): Password {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(value, salt)

    return new Password(hash, salt)
  }

  public compare (value: string): boolean {
    return bcrypt.compareSync(value, this.#value)
  }
}

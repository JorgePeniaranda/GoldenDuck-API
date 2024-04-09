import bcrypt from 'bcryptjs'

export class Password {
  #value: string
  #salt: string

  constructor (value: string) {
    this.#salt = bcrypt.genSaltSync(10)
    this.#value = bcrypt.hashSync(value, this.#salt)
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

  compare (value: string): boolean {
    return bcrypt.compareSync(value, this.#value)
  }
}

import { type ZodType } from 'zod'

export abstract class ValueObject<T> {
  constructor (
    readonly value: T,
    private readonly schema: ZodType
  ) {
    this.value = this.validate(value, this.schema)
  }

  private validate (value: T, schema: ZodType): T {
    return schema.parse(value)
  }

  public toString (): string {
    return String(this.value)
  }
}

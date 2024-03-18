import { type ZodType } from 'zod'

export abstract class ValueObject {
  constructor (
    readonly value: unknown,
    private readonly schema: ZodType
  ) {
    this.value = this.validate(value, this.schema)
  }

  private validate (value: unknown, schema: ZodType): unknown {
    return schema.parse(value)
  }

  public toString (): string {
    return String(this.value)
  }
}

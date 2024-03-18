import { type ZodType } from 'zod'

export abstract class ValueObject {
  constructor (
    readonly value: any,
    private readonly schema: ZodType
  ) {
    this.value = this.validate(value, this.schema)
  }

  private validate (value: any, schema: ZodType): any {
    return schema.parse(value)
  }

  public toString (): string {
    return String(this.value)
  }
}

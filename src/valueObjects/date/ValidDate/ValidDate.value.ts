import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveValidDate } from './ValidDate.primitive'
import { ValidDateSchema } from './ValidDate.schema'

export class ValidDate extends ValueObject<PrimitiveValidDate['validDate']> {
  constructor (validDate: PrimitiveValidDate['validDate'], name?: string) {
    super(validDate, ValidDateSchema(name ?? 'PastDate'))
  }
}

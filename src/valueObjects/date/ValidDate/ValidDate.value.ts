import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveValidDate } from './ValidDate.primitive'
import { ValidDateSchema } from './ValidDate.schema'

export class ValidDate extends ValueObject {
  constructor (validDate: PrimitiveValidDate['validDate']) {
    super(validDate, ValidDateSchema('PastDate'))
  }
}

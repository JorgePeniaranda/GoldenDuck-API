import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveCardNumber } from './CardNumber.primitive'
import { PositiveFloatSchema } from '@/valueObjects/number/PositiveFloat/PositiveFloat.schema'

export class CardNumber extends ValueObject<PrimitiveCardNumber['cardNumber']> {
  constructor (readonly cardNumber: PrimitiveCardNumber['cardNumber']) {
    super(cardNumber, PositiveFloatSchema('CardNumber'))
  }
}

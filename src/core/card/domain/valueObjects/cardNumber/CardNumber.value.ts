import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveCardNumber } from './CardNumber.primitive'
import { CardNumberSchema } from './CardNumber.schema'

export class CardNumber extends ValueObject<PrimitiveCardNumber['cardNumber']> {
  constructor (cardNumber: PrimitiveCardNumber['cardNumber']) {
    super(cardNumber, CardNumberSchema('CardNumber'))
  }
}

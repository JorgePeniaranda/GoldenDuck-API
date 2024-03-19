import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveCardNumber } from './CardNumber.primitive'
import { CardNumberSchema } from './CardNumber.schema'

export class CardNumber extends ValueObject<PrimitiveCardNumber['cardNumber']> {
  constructor (cardNumber: PrimitiveCardNumber['cardNumber'], name?: string) {
    super(cardNumber, CardNumberSchema(name ?? 'CardNumber'))
  }
}

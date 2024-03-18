import { type PrimitivePositiveBigInt } from '@/valueObjects/number/PositiveBigInt/PositiveBigInt.primitive'

export interface PrimitiveCardNumber {
  cardNumber: PrimitivePositiveBigInt['bigint']
}

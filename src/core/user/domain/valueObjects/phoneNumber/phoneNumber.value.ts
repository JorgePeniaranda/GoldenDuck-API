import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitivePhoneNumber } from './phoneNumber.primitive'
import { PhoneNumberSchema } from './phoneNumber.validation'

export class PhoneNumber extends ValueObject {
  constructor (phoneNumber: PrimitivePhoneNumber['phoneNumber']) {
    super(phoneNumber, PhoneNumberSchema('PhoneNumber'))
  }
}

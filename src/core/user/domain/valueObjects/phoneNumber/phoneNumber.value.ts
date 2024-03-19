import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitivePhoneNumber } from './phoneNumber.primitive'
import { PhoneNumberSchema } from './phoneNumber.schema'

export class PhoneNumber extends ValueObject<
PrimitivePhoneNumber['phoneNumber']
> {
  constructor (phoneNumber: PrimitivePhoneNumber['phoneNumber']) {
    super(phoneNumber, PhoneNumberSchema('PhoneNumber'))
  }
}

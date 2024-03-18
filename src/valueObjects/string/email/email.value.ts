import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveEmail } from './email.primitive'
import { EmailSchema } from './email.schema'

export class Email extends ValueObject<PrimitiveEmail['email']> {
  constructor (email: PrimitiveEmail['email']) {
    super(email, EmailSchema('Email'))
  }
}

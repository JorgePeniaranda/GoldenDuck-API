import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveEmail } from './email.primitive'
import { EmailSchema } from './email.schema'

export class Email extends ValueObject {
  constructor (email: PrimitiveEmail['email']) {
    super(email, EmailSchema('Email'))
  }
}

import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveEmail } from './email.primitive'
import { EmailSchema } from './email.schema'

export class Email extends ValueObject<PrimitiveEmail['email']> {
  constructor (email: PrimitiveEmail['email'], name?: string) {
    super(email, EmailSchema(name ?? 'Email'))
  }
}

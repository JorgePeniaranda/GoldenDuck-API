import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveURL } from './url.primitive'
import { URLSchema } from './url.validation'

export class URL extends ValueObject {
  constructor (url: PrimitiveURL['url']) {
    super(url, URLSchema('URL'))
  }
}

import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveURL } from './url.primitive'
import { URLSchema } from './url.validation'

export class URL extends ValueObject<PrimitiveURL['url']> {
  constructor (url: PrimitiveURL['url'], name?: string) {
    super(url, URLSchema(name ?? 'URL'))
  }
}

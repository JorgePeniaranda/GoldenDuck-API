import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveCVV } from './cvv.primitive'
import { CVVSchema } from './cvv.schema'

export class CVV extends ValueObject<PrimitiveCVV['cvv']> {
  constructor (cvv: PrimitiveCVV['cvv'], name?: string) {
    super(cvv, CVVSchema(name ?? 'CVV'))
  }
}

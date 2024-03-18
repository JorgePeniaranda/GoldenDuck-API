import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitivePastDate } from './PastDate.primitive'
import { PastDateSchema } from './PastDate.schema'

export class PastDate extends ValueObject<PrimitivePastDate['pastDate']> {
  constructor (pastDate: PrimitivePastDate['pastDate'], name?: string) {
    super(pastDate, PastDateSchema(name ?? 'PastDate'))
  }
}

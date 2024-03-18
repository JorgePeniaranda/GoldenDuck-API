import { ValueObject } from '@/valueObjects/valueObjects.prototipe'
import { type PrimitiveID } from './ID.primitive'
import { IDSchema } from './ID.schema'

export class ID extends ValueObject<PrimitiveID['id']> {
  constructor (id: PrimitiveID['id']) {
    super(id, IDSchema('ID'))
  }
}

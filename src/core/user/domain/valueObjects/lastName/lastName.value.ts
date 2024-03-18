import { type PrimitiveLastName } from './LastName.primitive'
import { Alphabetic } from '@/valueObjects/string/alphabetic/alphabetic.value'

export class LastName extends Alphabetic {
  constructor (lastName: PrimitiveLastName['lastName']) {
    super(lastName, 'LastName')
  }
}

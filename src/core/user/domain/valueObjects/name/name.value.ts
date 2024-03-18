import { type PrimitiveName } from './name.primitive'
import { Alphabetic } from '@/valueObjects/string/alphabetic/alphabetic.value'

export class Name extends Alphabetic {
  constructor (name: PrimitiveName['name']) {
    super(name, 'Name')
  }
}

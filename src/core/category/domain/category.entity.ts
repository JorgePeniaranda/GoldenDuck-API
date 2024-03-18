import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type PrimitiveAlphabetic } from '@/valueObjects/string/alphabetic/alphabetic.primitive'
import { type Alphabetic } from '@/valueObjects/string/alphabetic/alphabetic.value'

export interface CategoryEntity {
  id: ID
  name: Alphabetic
  deleted: boolean
}

export interface CategoryPrimitiveEntity {
  id: PrimitiveID['id']
  name: PrimitiveAlphabetic['alphabetic']
  deleted: boolean
}

import { type PrimitiveAlphabetic } from '@/valueObjects/alphabetic/alphabetic.primitive'
import { type Alphabetic } from '@/valueObjects/alphabetic/alphabetic.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'

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

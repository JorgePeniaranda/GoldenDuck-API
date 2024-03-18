import { type PrimitiveValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.primitive'
import { type ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type PrimitiveAlphabetic } from '@/valueObjects/string/alphabetic/alphabetic.primitive'
import { type Alphabetic } from '@/valueObjects/string/alphabetic/alphabetic.value'

export interface CategoryEntity {
  id: ID
  name: Alphabetic
  deleted: ValidBoolean
}

export interface CategoryPrimitiveEntity {
  id: PrimitiveID['id']
  name: PrimitiveAlphabetic['alphabetic']
  deleted: PrimitiveValidBoolean['boolean']
}

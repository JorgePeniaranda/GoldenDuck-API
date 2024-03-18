import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'

export interface CategoryEntity {
  id: ID
  name: string
  deleted: boolean
}

export interface CategoryPrimitiveEntity {
  id: PrimitiveID['id']
  name: string
  deleted: boolean
}

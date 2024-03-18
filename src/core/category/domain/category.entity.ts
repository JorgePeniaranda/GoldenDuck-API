import { type ID } from '@/valueObjects/id/id.value'

export interface CategoryEntity {
  id: ID
  name: string
  deleted: boolean
}

export interface CategoryPrimitiveEntity {
  id: number
  name: string
  deleted: boolean
}

import { type ID } from '@/valueObjects/id/id.value'

export interface CategoryEntity {
  id: ID
  name: string
  deleted: boolean
}

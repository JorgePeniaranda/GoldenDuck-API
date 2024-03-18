import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type ID } from '@/valueObjects/id/id.value'

export interface ErrorEntity {
  id: ID
  name: string
  message: string
  date: ValidDate
  deleted: boolean
}

export interface ErrorPrimitiveEntity {
  id: number
  name: string
  message: string
  date: Date
  deleted: boolean
}

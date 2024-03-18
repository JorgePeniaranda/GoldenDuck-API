import { type ErrorEntity } from './error.entity'
import { type Error } from './error.value'

export interface ErrorRepository {
  createError: (user: Error) => Promise<Error>
  updateError: (user: Error) => Promise<Error>
  deleteError: (user: Error) => Promise<void>
  findError: ({
    id
  }: {
    id?: ErrorEntity['id']
  }) => Promise<Error | null>
}

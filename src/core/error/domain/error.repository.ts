import { type ErrorEntity } from './error.entity'
import { type Error } from './error.value'

export interface ErrorRepository {
  createError: ({
    name,
    message
  }: {
    name: ErrorEntity['name']
    message: ErrorEntity['message']
  }) => Promise<Error>
  getAllError: () => Promise<Error[] | null>
  findError: ({ id }: { id?: ErrorEntity['id'] }) => Promise<Error | null>
  deleteError: ({ id }: { id: ErrorEntity['id'] }) => Promise<void>
}

import { type CreateErrorDTO } from './dto/create-error'
import { type Error } from './error.entity'
import { type ErrorPrimitive } from './error.primitive'

export interface ErrorRepository {
  create: (transaction: CreateErrorDTO) => Promise<Error>
  getAll: () => Promise<Error[] | null>
  find: (id: ErrorPrimitive['id']) => Promise<Error | null>
  delete: (id: ErrorPrimitive['id']) => Promise<void>
}

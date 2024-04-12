import { type Error } from './error.entity'
import { type ErrorPrimitive } from './error.primitive'

export interface ErrorRepository {
  create: (data: Error) => Promise<Error>
  findAll: () => Promise<Error[]>
  findOne: ({ id }: { id: ErrorPrimitive['id'] }) => Promise<Error | null>
  delete: (data: Error) => Promise<void>
}

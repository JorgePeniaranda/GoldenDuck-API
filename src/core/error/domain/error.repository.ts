import { type CreateErrorDTO } from './dto/create-error'
import { type Error } from './error.entity'
import { type ErrorPrimitive } from './error.primitive'

export interface ErrorRepository {
  create: (data: CreateErrorDTO) => Promise<Error>
  findAll: () => Promise<Error[] | null>
  findOne: (id: ErrorPrimitive['id']) => Promise<Error | null>
  delete: (id: ErrorPrimitive['id']) => Promise<void>
}

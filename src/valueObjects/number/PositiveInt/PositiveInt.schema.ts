import { ValidationDictionary } from '@/messages/validations'
import { IntSchema } from '../Int/Int.schema'
import { type ZodNumber } from 'zod'

export const PositiveIntSchema = (name: string): ZodNumber => {
  return IntSchema(name).nonnegative({
    message: ValidationDictionary.global.nonNegative(name)
  })
}

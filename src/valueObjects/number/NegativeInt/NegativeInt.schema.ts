import { ValidationDictionary } from '@/messages/validations'
import { IntSchema } from '../Int/Int.schema'
import { type ZodNumber } from 'zod'

export const NegativeIntSchema = (name: string): ZodNumber => {
  return IntSchema(name).nonpositive({
    message: ValidationDictionary.global.nonPositive(name)
  })
}

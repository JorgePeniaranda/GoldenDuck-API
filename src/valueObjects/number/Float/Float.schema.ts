import { ValidationDictionary } from '@/messages/validations'
import { type ZodNumber, z } from 'zod'

export const FloatSchema = (name: string): ZodNumber => {
  return z
    .number({
      required_error: ValidationDictionary.global.required(name),
      invalid_type_error: ValidationDictionary.global.invalidType(name)
    })
    .nonnegative({ message: ValidationDictionary.global.nonNegative(name) })
    .finite({ message: ValidationDictionary.global.finite(name) })
}

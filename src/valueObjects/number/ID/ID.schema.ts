import { ValidationDictionary } from '@/messages/validations'
import { z, type ZodNumber } from 'zod'

export const IDSchema = (name: string): ZodNumber => {
  return z
    .number({
      required_error: ValidationDictionary.global.required(name),
      invalid_type_error: ValidationDictionary.global.invalidType(name)
    })
    .nonnegative({
      message: ValidationDictionary.global.nonNegative(name)
    })
}

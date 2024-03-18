import { ValidationDictionary } from '@/messages/validations'
import { z, type ZodNumber } from 'zod'

export const IntSchema = (name: string): ZodNumber => {
  return z
    .number({
      required_error: ValidationDictionary.global.required(name),
      invalid_type_error: ValidationDictionary.global.invalidType(name)
    })
    .int({ message: ValidationDictionary.global.invalidType(name) })
    .finite({ message: ValidationDictionary.global.finite(name) })
}

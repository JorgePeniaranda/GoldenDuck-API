import { ValidationDictionary } from '@/messages/validations'
import { type ZodString, z } from 'zod'

export const URLSchema = (name: string): ZodString => {
  return z
    .string({
      required_error: ValidationDictionary.global.required(name),
      invalid_type_error: ValidationDictionary.global.invalidType(name)
    })
    .url({
      message: ValidationDictionary.global.invalidType(name)
    })
    .min(1, {
      message: ValidationDictionary.global.required(name)
    })
}

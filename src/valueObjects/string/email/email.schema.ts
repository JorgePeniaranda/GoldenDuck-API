import { ValidationDictionary } from '@/messages/validations'
import { type ZodString, z } from 'zod'

export const EmailSchema = (name: string): ZodString => {
  return z
    .string({
      required_error: ValidationDictionary.global.required(name),
      invalid_type_error: ValidationDictionary.global.invalidType(name)
    })
    .email({ message: ValidationDictionary.global.invalidEmail(name) })
    .min(1, { message: ValidationDictionary.global.required(name) })
}

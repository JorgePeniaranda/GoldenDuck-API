import { ValidationDictionary } from '@/messages/validations'
import { z, type ZodString } from 'zod'

export const ValidStringSchema = (name: string): ZodString => {
  return z.string({
    required_error: ValidationDictionary.global.required(name),
    invalid_type_error: ValidationDictionary.global.invalidType(name)
  })
}

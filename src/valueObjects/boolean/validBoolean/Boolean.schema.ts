import { ValidationDictionary } from '@/messages/validations'
import { type ZodBoolean, z } from 'zod'

export const BooleanSchema = (name: string): ZodBoolean => {
  return z
    .boolean({
      required_error: ValidationDictionary.global.required(name),
      invalid_type_error: ValidationDictionary.global.invalidType(name)
    })
}

import { ValidationDictionary } from '@/messages/validations'
import { type ZodDate, z } from 'zod'

export const ValidDateSchema = (name: string): ZodDate => {
  return z.coerce.date({
    required_error: ValidationDictionary.global.required(name),
    invalid_type_error: ValidationDictionary.global.invalidType(name)
  })
}

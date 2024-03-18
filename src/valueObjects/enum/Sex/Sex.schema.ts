import { ValidationDictionary } from '@/messages/validations'
import { type ZodEnum, z } from 'zod'

export const SexSchema = (name: string): ZodEnum<['MALE', 'FEMALE']> => {
  return z.enum(['MALE', 'FEMALE'], {
    required_error: ValidationDictionary.global.required(name),
    invalid_type_error: ValidationDictionary.global.invalidType(name)
  })
}

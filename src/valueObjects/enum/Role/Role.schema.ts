import { ValidationDictionary } from '@/messages/validations'
import { type ZodEnum, z } from 'zod'

export const RoleSchema = (
  name: string
): ZodEnum<['ADMIN', 'SUPPORT', 'USER']> => {
  return z.enum(['ADMIN', 'SUPPORT', 'USER'], {
    required_error: ValidationDictionary.global.required(name),
    invalid_type_error: ValidationDictionary.global.invalidType(name)
  })
}

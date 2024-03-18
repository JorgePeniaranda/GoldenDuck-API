import { ValidationDictionary } from '@/messages/validations'
import { checkPasswordStrong } from '@/utils'
import { type ZodType, z } from 'zod'

const minLength = 8
const maxLength = 72

export const PasswordSchema = (name: string): ZodType => {
  return z
    .string({
      required_error: ValidationDictionary.global.required(name),
      invalid_type_error: ValidationDictionary.global.invalidType(name)
    })
    .min(1, { message: ValidationDictionary.global.required(name) })
    .min(minLength, {
      message: ValidationDictionary.global.invalidMin(name, maxLength)
    })
    .max(maxLength, {
      message: ValidationDictionary.global.invalidMax(name, maxLength)
    })
    .refine(checkPasswordStrong, {
      message: ValidationDictionary.password.strong
    })
}

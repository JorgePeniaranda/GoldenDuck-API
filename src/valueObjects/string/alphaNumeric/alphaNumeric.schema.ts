import { ValidationDictionary } from '@/messages/validations'
import { checkAlphanumeric } from '@/utils'
import { type ZodType, z } from 'zod'

export const AlphaNumericSchema = (name: string): ZodType => {
  return z
    .string({
      required_error: ValidationDictionary.global.required(name),
      invalid_type_error: ValidationDictionary.global.invalidType(name)
    })
    .refine(checkAlphanumeric, {
      message: ValidationDictionary.global.onlyAlphaNumeric(name)
    })
}

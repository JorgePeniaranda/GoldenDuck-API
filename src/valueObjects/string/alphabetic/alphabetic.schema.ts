import { ValidationDictionary } from '@/messages/validations'
import { checkOnlyLetters } from '@/utils'
import { type ZodType, z } from 'zod'

export const AlphabeticSchema = (name: string): ZodType => {
  return z
    .string({
      required_error: ValidationDictionary.global.required(name),
      invalid_type_error: ValidationDictionary.global.invalidType(name)
    })
    .refine(checkOnlyLetters, {
      message: ValidationDictionary.global.onlyAlphabetic(name)
    })
}

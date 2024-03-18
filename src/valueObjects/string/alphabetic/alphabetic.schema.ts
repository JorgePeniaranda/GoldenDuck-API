import { ValidationDictionary } from '@/messages/validations'
import { checkOnlyLetters } from '@/utils'
import { type ZodType } from 'zod'
import { ValidStringSchema } from '../string/String.schema'

export const AlphabeticSchema = (name: string): ZodType => {
  return ValidStringSchema(name)
    .refine(checkOnlyLetters, {
      message: ValidationDictionary.global.onlyAlphabetic(name)
    })
}

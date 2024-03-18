import { ValidationDictionary } from '@/messages/validations'
import { checkOnlyLetters } from '@/utils'
import { type ZodType } from 'zod'
import { StringSchema } from '../string/String.schema'

export const AlphabeticSchema = (name: string): ZodType => {
  return StringSchema(name)
    .refine(checkOnlyLetters, {
      message: ValidationDictionary.global.onlyAlphabetic(name)
    })
}

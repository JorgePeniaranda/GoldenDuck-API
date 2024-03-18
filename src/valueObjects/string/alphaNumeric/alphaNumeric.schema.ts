import { ValidationDictionary } from '@/messages/validations'
import { checkAlphanumeric } from '@/utils'
import { type ZodType } from 'zod'
import { StringSchema } from '../string/String.schema'

export const AlphaNumericSchema = (name: string): ZodType => {
  return StringSchema(name)
    .refine(checkAlphanumeric, {
      message: ValidationDictionary.global.onlyAlphaNumeric(name)
    })
}

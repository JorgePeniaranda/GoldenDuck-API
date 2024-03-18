import { ValidationDictionary } from '@/messages/validations'
import { checkAlphanumeric } from '@/utils'
import { type ZodType } from 'zod'
import { ValidStringSchema } from '../string/String.schema'

export const AlphaNumericSchema = (name: string): ZodType => {
  return ValidStringSchema(name)
    .refine(checkAlphanumeric, {
      message: ValidationDictionary.global.onlyAlphaNumeric(name)
    })
}

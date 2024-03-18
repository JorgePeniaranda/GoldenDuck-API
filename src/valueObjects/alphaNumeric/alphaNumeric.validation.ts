import { checkAlphanumeric } from '@/utils'
import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const ValidatedAlphaNumeric = z
  .string({
    required_error: ValidationDictionary.alphaNumeric.required,
    invalid_type_error: ValidationDictionary.alphaNumeric.invalidType
  })
  .refine(checkAlphanumeric, {
    message: ValidationDictionary.alphaNumeric.onlyAlphaNumeric
  })

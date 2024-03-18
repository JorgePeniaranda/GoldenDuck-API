import { checkOnlyLetters } from '@/utils'
import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const ValidatedAlphabetic = z
  .string({
    required_error: ValidationDictionary.alphabetic.required,
    invalid_type_error: ValidationDictionary.alphabetic.invalidType
  })
  .refine(checkOnlyLetters, {
    message: ValidationDictionary.alphabetic.onlyLetters
  })

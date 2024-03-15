import { ValidationDictionary } from '../../../../../messages/validations'
import { checkOnlyLetters } from '../../../../../utils'
import { z } from 'zod'

export const LastNameValidation = z
  .string({
    required_error: ValidationDictionary.lastName.required,
    invalid_type_error: ValidationDictionary.lastName.invalidType
  })
  .min(1, { message: ValidationDictionary.lastName.required })
  .refine(checkOnlyLetters, {
    message: ValidationDictionary.lastName.onlyLetters
  })

import { ValidationDictionary } from '../../../../../messages/validations'
import { checkOnlyLetters } from '../../../../../utils'
import { z } from 'zod'

export const NameValidation = z
  .string({
    required_error: ValidationDictionary.name.required,
    invalid_type_error: ValidationDictionary.name.invalidType
  })
  .min(1, { message: ValidationDictionary.name.required })
  .refine(checkOnlyLetters, {
    message: ValidationDictionary.name.onlyLetters
  })

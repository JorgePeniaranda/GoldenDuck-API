import { ValidationDictionary } from '../../../../../messages/validations'
import { checkAlphanumeric } from '../../../../../utils'
import { z } from 'zod'

export const addressValidation = z
  .string({
    required_error: ValidationDictionary.address.required,
    invalid_type_error: ValidationDictionary.address.invalidType
  })
  .min(1, { message: ValidationDictionary.address.required })
  .refine(checkAlphanumeric, {
    message: ValidationDictionary.address.onlyLetters
  })

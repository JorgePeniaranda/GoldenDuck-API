import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const EmailValidation = z
  .string({
    required_error: ValidationDictionary.email.required,
    invalid_type_error: ValidationDictionary.email.invalidType
  })
  .email({ message: ValidationDictionary.email.invalidEmail })
  .min(1, { message: ValidationDictionary.email.required })

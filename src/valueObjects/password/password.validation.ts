import { ValidationDictionary } from '../../messages/validations'
import { checkPasswordStrong } from '../../utils'
import { z } from 'zod'

export const PasswordValidation = z
  .string({
    required_error: ValidationDictionary.password.required,
    invalid_type_error: ValidationDictionary.password.invalidType
  })
  .min(1, { message: ValidationDictionary.password.required })
  .min(8, { message: ValidationDictionary.password.min })
  .max(72, { message: ValidationDictionary.password.max })
  .refine(checkPasswordStrong, {
    message: ValidationDictionary.password.strong
  })

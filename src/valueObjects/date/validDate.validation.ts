import ValidationDictionary from '../../messages/validations'
import { z } from 'zod'

export const ValidDateValidation = z.coerce
  .date({
    required_error: ValidationDictionary.validDate.required,
    invalid_type_error: ValidationDictionary.validDate.invalidType
  })
  .refine(
    (date) => {
      const now = new Date()
      return date <= now
    },
    { message: ValidationDictionary.validDate.invalidDate }
  )

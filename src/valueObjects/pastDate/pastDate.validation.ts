import { ValidationDictionary } from '../../messages/validations'
import { z } from 'zod'

export const ValidatedPastDate = z.coerce
  .date({
    required_error: ValidationDictionary.futureDate.required,
    invalid_type_error: ValidationDictionary.futureDate.invalidType
  })
  .refine((date) => {
    return date <= new Date()
  }, {
    message: ValidationDictionary.futureDate.invalidDate
  })
